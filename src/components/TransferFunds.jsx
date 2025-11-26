import React, { useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { createWalletClient, custom, parseUnits, encodeFunctionData } from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import { XMarkIcon, ArrowRightIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const SOLANA_DESTINATION = 'B4bAbipNRXjtcbs78t6dBKWXwd4tkLu5kUvsH2Txds5J';
// TODO: Replace with actual Ethereum destination address
const ETHEREUM_DESTINATION = '0x0000000000000000000000000000000000000000';

const TOKENS = {
    mainnet: {
        solana: {
            USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
        },
        ethereum: {
            USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        },
    },
    testnet: {
        solana: {
            // Devnet USDC (Fake)
            USDC: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
            // Devnet USDT (Fake - using same for demo or find another faucet)
            USDT: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
        },
        ethereum: {
            // Sepolia USDC (Circle Faucet)
            USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
            // Sepolia USDT (Fake)
            USDT: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06',
        },
    }
};

const ERC20_ABI = [
    {
        name: 'transfer',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'recipient', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool' }],
    },
];

export default function TransferFunds({ destinationAddress, onClose }) {
    const { user, login } = usePrivy();
    const { wallets } = useWallets();
    const [network, setNetwork] = useState('mainnet');
    const [chain, setChain] = useState('solana');
    const [token, setToken] = useState('USDC');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [showSettings, setShowSettings] = useState(false);

    // Use prop address or fallback to default if not provided (for safety/demo)
    const targetAddress = destinationAddress || SOLANA_DESTINATION;

    // Calculate projected earnings (mock calculation: 14.4% APY)
    const projectedEarnings = amount ? (parseFloat(amount) * 0.14416).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '$0.00';

    const handleTransfer = async () => {
        if (!user) {
            login();
            return;
        }

        const wallet = wallets[0];
        if (!wallet) {
            setStatus('No wallet connected');
            return;
        }

        setLoading(true);
        setStatus('Initiating transfer...');

        try {
            if (chain === 'solana') {
                await handleSolanaTransfer(wallet);
            } else {
                await handleEthereumTransfer(wallet);
            }
        } catch (error) {
            console.error('Transfer failed:', error);
            setStatus(`Transfer failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSolanaTransfer = async (wallet) => {
        if (wallet.walletClientType !== 'solana') {
            if (!user.wallet?.address) {
                throw new Error("Please connect a Solana-compatible wallet.");
            }
        }

        const rpcUrl = network === 'mainnet'
            ? 'https://api.mainnet-beta.solana.com'
            : 'https://api.devnet.solana.com';

        const connection = new Connection(rpcUrl);
        const mintAddress = TOKENS[network].solana[token];
        const mintPubkey = new PublicKey(mintAddress);
        const destPubkey = new PublicKey(targetAddress);
        const senderPubkey = new PublicKey(wallet.address);

        const senderATA = await getAssociatedTokenAddress(mintPubkey, senderPubkey);
        const receiverATA = await getAssociatedTokenAddress(mintPubkey, destPubkey);

        const transaction = new Transaction();

        const receiverAccountInfo = await connection.getAccountInfo(receiverATA);
        if (!receiverAccountInfo) {
            transaction.add(
                createAssociatedTokenAccountInstruction(
                    senderPubkey,
                    receiverATA,
                    destPubkey,
                    mintPubkey
                )
            );
        }

        const amountBigInt = BigInt(Math.floor(parseFloat(amount) * 1_000_000));

        transaction.add(
            createTransferInstruction(
                senderATA,
                receiverATA,
                senderPubkey,
                amountBigInt
            )
        );

        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = senderPubkey;

        const { signature } = await wallet.sendTransaction(transaction, connection);
        setStatus(`Transfer successful! Signature: ${signature}`);
    };

    const handleEthereumTransfer = async (wallet) => {
        const targetChainId = network === 'mainnet' ? mainnet.id : sepolia.id;
        const targetChain = network === 'mainnet' ? mainnet : sepolia;

        await wallet.switchChain(targetChainId);

        const provider = await wallet.getEthereumProvider();
        const address = wallet.address;

        const client = createWalletClient({
            account: address,
            chain: targetChain,
            transport: custom(provider)
        });

        const tokenAddress = TOKENS[network].ethereum[token];
        const amountBigInt = parseUnits(amount, 6);

        const data = encodeFunctionData({
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [targetAddress, amountBigInt]
        });

        const hash = await client.sendTransaction({
            account: address,
            to: tokenAddress,
            data: data,
            chain: targetChain
        });

        setStatus(`Transfer successful! Hash: ${hash}`);
    };

    // Format amount for display
    const formatAmount = (value) => {
        if (!value) return '';
        // Remove non-numeric chars except decimal
        const numericValue = value.replace(/[^0-9.]/g, '');
        // Split into integer and decimal parts
        const parts = numericValue.split('.');
        // Format integer part with commas
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // Rejoin
        return '$' + parts.join('.');
    };

    const handleAmountChange = (e) => {
        // Get raw value without formatting
        let value = e.target.value.replace(/[^0-9.]/g, '');

        // Prevent multiple decimals
        if ((value.match(/\./g) || []).length > 1) return;

        // Limit decimal places to 2 (standard for USD)
        if (value.includes('.')) {
            const parts = value.split('.');
            if (parts[1].length > 2) return;
        }

        setAmount(value);
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#0A0A0A] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 relative min-h-[800px] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-900/50">
                <button
                    onClick={onClose}
                    className="flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                    <XMarkIcon className="w-5 h-5 mr-2" />
                    Close & discard
                </button>
                <div className="text-white font-bold tracking-widest text-sm">ONBOARD CAPITAL</div>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <Cog6ToothIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Settings Panel (Toggleable) */}
            {showSettings && (
                <div className="bg-[#111] p-4 border-b border-gray-800 flex flex-wrap gap-4 justify-center animate-in slide-in-from-top-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 uppercase">Network</span>
                        <div className="flex bg-black rounded-lg p-1">
                            <button onClick={() => setNetwork('mainnet')} className={`px-3 py-1 rounded text-xs ${network === 'mainnet' ? 'bg-gray-800 text-white' : 'text-gray-500'}`}>Mainnet</button>
                            <button onClick={() => setNetwork('testnet')} className={`px-3 py-1 rounded text-xs ${network === 'testnet' ? 'bg-green-900/30 text-green-400' : 'text-gray-500'}`}>Testnet</button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 uppercase">Chain</span>
                        <div className="flex bg-black rounded-lg p-1">
                            <button onClick={() => setChain('solana')} className={`px-3 py-1 rounded text-xs ${chain === 'solana' ? 'bg-purple-900/30 text-purple-400' : 'text-gray-500'}`}>Solana</button>
                            <button onClick={() => setChain('ethereum')} className={`px-3 py-1 rounded text-xs ${chain === 'ethereum' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-500'}`}>Ethereum</button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 uppercase">Token</span>
                        <div className="flex bg-black rounded-lg p-1">
                            <button onClick={() => setToken('USDC')} className={`px-3 py-1 rounded text-xs ${token === 'USDC' ? 'bg-blue-500/20 text-blue-300' : 'text-gray-500'}`}>USDC</button>
                            <button onClick={() => setToken('USDT')} className={`px-3 py-1 rounded text-xs ${token === 'USDT' ? 'bg-green-500/20 text-green-300' : 'text-gray-500'}`}>USDT</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-900/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Chat Interface */}
                <div className="w-full max-w-lg mb-12 space-y-4">
                    <div className="flex items-start space-x-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden border border-gray-600">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nelson" alt="Nelson" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-2">
                            <div className="bg-[#1A1A1A] text-gray-300 text-sm p-4 rounded-2xl rounded-tl-none border border-gray-800 shadow-sm">
                                <p>Welcome aboard. I'm Nelson, here to help you get your capital onboarded. We support {token} on {chain === 'solana' ? 'Solana' : 'ETH L1'}.</p>
                            </div>
                            <div className="bg-[#1A1A1A] text-gray-300 text-sm p-4 rounded-2xl rounded-tl-none border border-gray-800 shadow-sm delay-150">
                                <p>One onboard, we'll deploy this capital against shipments.</p>
                            </div>
                            <div className="bg-[#1A1A1A] text-gray-300 text-sm p-4 rounded-2xl rounded-tl-none border border-gray-800 shadow-sm delay-300">
                                <p>One more thing: we don't lock your capital when staked. You can always withdraw.</p>
                                <p className="text-xs text-gray-500 mt-2">Nelson · Just now</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projected Earnings Card */}
                <div className="w-full max-w-lg bg-[#0F0F0F] border border-gray-800 rounded-xl p-6 mb-12 relative overflow-hidden group h-32 flex items-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>

                    <div className="flex justify-between items-center w-full relative z-10">
                        <div className="text-gray-400 text-xs tracking-widest uppercase font-medium">Projected Earnings</div>
                        <div className="text-right">
                            <div className="text-[#D4AF37] text-xs tracking-widest uppercase font-medium mb-1">Est. Annual Earnings</div>
                            <div className="text-[#D4AF37] text-xl font-mono">{projectedEarnings}</div>
                        </div>
                    </div>
                </div>

                {/* Amount Input */}
                <div className="w-full max-w-lg text-center mb-12">
                    <label className="block text-gray-500 text-xs tracking-widest uppercase font-medium mb-4">Amount in USD</label>
                    <div className="relative inline-block w-full">
                        <input
                            type="text"
                            value={formatAmount(amount)}
                            onChange={handleAmountChange}
                            placeholder="$0.00"
                            className="w-full bg-transparent text-center text-6xl md:text-7xl font-light text-white placeholder-gray-800 focus:outline-none focus:placeholder-gray-900 transition-all font-mono"
                        />
                    </div>
                    <div className="h-px w-full bg-gray-800 mt-4 max-w-xs mx-auto"></div>
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleTransfer}
                    disabled={loading || !amount}
                    className={`group relative flex items-center justify-center space-x-2 py-3 px-8 rounded-full font-medium transition-all duration-300 ${loading || !amount
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-[#D4AF37] text-black hover:bg-[#C5A028] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                        }`}
                >
                    <span>{loading ? 'Processing...' : 'Continue'}</span>
                    {!loading && <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>

                {/* Status Message */}
                {status && (
                    <div className={`mt-6 text-sm ${status.includes('failed') ? 'text-red-400' : 'text-green-400'} animate-in fade-in slide-in-from-bottom-2`}>
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}

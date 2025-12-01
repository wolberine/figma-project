import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useVaults } from '../context/VaultContext';
import TransferFunds from '../components/TransferFunds';

const VaultDetail = () => {
    const { id } = useParams();
    const { getVault, loading } = useVaults();
    const [showTransferModal, setShowTransferModal] = useState(false);

    const vaultData = getVault(id);

    // Show loading state while data is being fetched
    if (loading) {
        return (
            <Layout>
                <div className="max-w-7xl mx-auto px-6 pb-20 pt-10 flex items-center justify-center min-h-screen">
                    <div className="text-secondary text-lg">Loading...</div>
                </div>
            </Layout>
        );
    }

    // Only redirect if data is loaded but vault not found
    if (!vaultData) {
        return <Navigate to="/" replace />;
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 pb-20 pt-10 relative">
                {/* Breadcrumb / Back */}
                <Link to="/" className="inline-flex items-center text-secondary hover:text-white transition-colors mb-8 text-xs font-bold tracking-widest uppercase">
                    ← Back to Vaults
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Main Info */}
                    <div className="lg:col-span-7">
                        <div className="text-gold text-xs font-bold tracking-widest uppercase mb-6">{vaultData.code}</div>
                        <h1 className="font-serif italic text-5xl md:text-7xl mb-8 leading-tight">{vaultData.title}</h1>

                        <div className="prose prose-invert max-w-none text-secondary leading-relaxed mb-12">
                            <p className="text-lg text-white mb-6">
                                {vaultData.description}
                            </p>
                            <p>
                                The Flagship Fund is designed for institutional and high-net-worth investors seeking stable, high-yield returns backed by real-world assets. By aggregating capital across a diversified portfolio of shipping and trade finance opportunities, we minimize idiosyncratic risk while maximizing yield.
                            </p>
                            <p>
                                All trades are fully insured and audited by top-tier firms, ensuring transparency and security for all participants.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 border-t border-white/10 pt-8">
                            <div>
                                <div className="text-[10px] text-secondary uppercase tracking-widest mb-2">Current APY</div>
                                <div className="text-lg font-mono text-white">{vaultData.apy}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-secondary uppercase tracking-widest mb-2">TVL</div>
                                <div className="text-lg font-mono text-white">{vaultData.tvl}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-secondary uppercase tracking-widest mb-2">Inception</div>
                                <div className="text-lg font-mono text-white">{vaultData.inception}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-secondary uppercase tracking-widest mb-2">Risk Rating</div>
                                <div className="text-lg font-mono text-gold">{vaultData.risk}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actions & Performance */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* Action Card */}
                        <div className="bg-surface border border-white/10 p-8">
                            <h3 className="font-serif italic text-2xl mb-6">Manage Position</h3>

                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => setShowTransferModal(true)}
                                    className="flex-1 py-3 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors"
                                >
                                    Deposit
                                </button>
                                <button className="flex-1 py-3 bg-white/5 text-white text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors">
                                    Withdraw
                                </button>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-secondary">Your Balance</span>
                                    <span className="font-mono text-white">$0.00</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-secondary">Pending Yield</span>
                                    <span className="font-mono text-gold">$0.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Performance Graph Placeholder */}
                        <div className="bg-surface border border-white/10 p-8 min-h-[300px] flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-serif italic text-2xl">Performance</h3>
                                <div className="flex gap-2">
                                    {['1M', '3M', '1Y', 'ALL'].map(period => (
                                        <button key={period} className="px-3 py-1 text-[10px] font-bold border border-white/10 hover:bg-white/5 transition-colors">
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 flex items-end justify-between gap-1">
                                {[40, 45, 42, 50, 48, 55, 60, 58, 65, 70, 75, 72, 80, 85, 82, 90].map((h, i) => (
                                    <div
                                        key={i}
                                        style={{ height: `${h}%` }}
                                        className="flex-1 bg-white/10 hover:bg-gold transition-colors min-w-[4px]"
                                    ></div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Transfer Modal */}
                {showTransferModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="min-h-full flex items-center justify-center p-4">
                            <div className="w-full max-w-5xl animate-in zoom-in-95 duration-200 my-8">
                                <TransferFunds
                                    solanaDestinationAddress={vaultData.solana_wallet_address}
                                    ethereumDestinationAddress={vaultData.ethereum_wallet_address}
                                    baseDestinationAddress={vaultData.base_wallet_address}
                                    onClose={() => setShowTransferModal(false)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default VaultDetail;

import React from 'react';
import TransferFunds from '../components/TransferFunds';
import Navbar from '../components/Navbar';

export default function TransferDemo() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    Fund Transfer Demo
                </h1>
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                    This component demonstrates how to transfer USDC/USDT from a connected wallet to the protocol on both Solana and Ethereum.
                </p>
                <TransferFunds onClose={() => { }} />
            </div>
        </div>
    );
}

import React from 'react';

const VaultDetailModal = ({ asset, onClose }) => {
    if (!asset) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-surface border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col md:flex-row max-h-[90vh]">

                {/* Left Panel: Info */}
                <div className="w-full md:w-1/2 p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between bg-background">
                    <div>
                        <div className="text-gold text-xs font-bold tracking-widest uppercase mb-6">{asset.code || 'NMCXX'}</div>
                        <h2 className="font-serif italic text-4xl md:text-5xl mb-6 leading-tight">{asset.title || asset.name}</h2>
                        <p className="text-secondary text-sm leading-relaxed mb-8">
                            {asset.description || 'A curated vault booking a diversified set of global commodity trades without fees or extended lockup times.'}
                        </p>

                        <div className="space-y-6">
                            <div>
                                <div className="text-[10px] text-secondary uppercase tracking-widest mb-1">Current APY</div>
                                <div className="text-3xl font-mono text-white">{asset.apy || '0.00%'}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-secondary uppercase tracking-widest mb-1">Total Value Locked</div>
                                <div className="text-3xl font-mono text-white">$124,592,000</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button className="w-full py-4 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors mb-4">
                            Deposit Funds
                        </button>
                        <p className="text-center text-[10px] text-secondary uppercase tracking-widest">
                            Read the full prospectus
                        </p>
                    </div>
                </div>

                {/* Right Panel: Performance / Graph */}
                <div className="w-full md:w-1/2 p-12 bg-surface flex flex-col">
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

                    {/* Graph Placeholder */}
                    <div className="flex-1 w-full bg-black/20 border border-white/5 mb-8 relative flex items-end justify-between p-6 gap-2">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none opacity-20">
                            <div className="border-t border-white/20 w-full"></div>
                            <div className="border-t border-white/20 w-full"></div>
                            <div className="border-t border-white/20 w-full"></div>
                            <div className="border-t border-white/20 w-full"></div>
                        </div>

                        {/* Bars */}
                        {[40, 55, 45, 60, 58, 75, 70, 85, 82, 90, 88, 95].map((h, i) => (
                            <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className="flex-1 bg-white/10 hover:bg-gold transition-colors cursor-pointer min-w-[4px]"
                            ></div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-xs text-secondary uppercase tracking-widest">Inception Date</span>
                            <span className="font-mono text-sm">Oct 24, 2023</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-xs text-secondary uppercase tracking-widest">Management Fee</span>
                            <span className="font-mono text-sm">0.00%</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-xs text-secondary uppercase tracking-widest">Risk Rating</span>
                            <span className="font-mono text-sm text-gold">A+</span>
                        </div>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-secondary hover:text-white transition-colors z-10"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default VaultDetailModal;

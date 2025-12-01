import React from 'react';

const VaultCard: React.FC = () => {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-background border border-border p-8 shadow-2xl">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-secondary font-medium mb-1">Total Balance</h2>
                        <div className="text-5xl font-bold tracking-tight text-white">
                            $124,592.00
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                        <span className="text-primary font-bold">+12.5% APY</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                        <p className="text-secondary text-sm mb-1">24h Earnings</p>
                        <p className="text-xl font-semibold text-primary">+$342.50</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                        <p className="text-secondary text-sm mb-1">Total Profit</p>
                        <p className="text-xl font-semibold text-white">+$12,402.00</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                        <p className="text-secondary text-sm mb-1">Next Payout</p>
                        <p className="text-xl font-semibold text-white">4h 23m</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VaultCard;

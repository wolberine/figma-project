import React from 'react';

const assets = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', balance: '1.245', value: '$45,230.00', apy: '5.2%' },
    { id: 2, name: 'Ethereum', symbol: 'ETH', balance: '14.52', value: '$32,400.00', apy: '4.8%' },
    { id: 3, name: 'USDC', symbol: 'USDC', balance: '45,000.00', value: '$45,000.00', apy: '12.5%' },
    { id: 4, name: 'Solana', symbol: 'SOL', balance: '245.00', value: '$14,230.00', apy: '6.5%' },
];

const AssetList = ({ onSelectAsset }) => {
    return (
        <div className="bg-surface border border-border rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-border">
                <h3 className="text-xl font-bold">Assets</h3>
            </div>
            <div className="divide-y divide-border">
                {assets.map((asset) => (
                    <div
                        key={asset.id}
                        onClick={() => onSelectAsset(asset)}
                        className="p-6 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center text-lg font-bold">
                                {asset.symbol[0]}
                            </div>
                            <div>
                                <p className="font-bold text-lg">{asset.name}</p>
                                <p className="text-secondary text-sm">{asset.symbol}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 text-right">
                            <div>
                                <p className="font-bold text-lg">{asset.value}</p>
                                <p className="text-secondary text-sm">{asset.balance} {asset.symbol}</p>
                            </div>
                            <div className="text-right min-w-[80px]">
                                <span className="text-primary font-bold">{asset.apy}</span>
                                <p className="text-secondary text-xs">APY</p>
                            </div>
                            <div className="text-secondary group-hover:text-white transition-colors">
                                →
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssetList;

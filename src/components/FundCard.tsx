import React from 'react';

interface FundCardProps {
    code: string;
    title: string;
    description: string;
    apy: string;
    incentivized?: boolean;
    image?: string | null;
    gradient?: string | null;
    wide?: boolean;
    onClick?: () => void;
}

const FundCard: React.FC<FundCardProps> = ({
    code,
    title,
    description,
    apy,
    incentivized = false,
    image = null,
    gradient = null,
    wide = false,
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={`group relative overflow-hidden bg-surface border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer ${wide ? 'col-span-1 md:col-span-3 min-h-[300px]' : 'col-span-1 min-h-[280px]'}`}
        >

            {/* Custom Gradient (if any) */}
            {gradient && (
                <div className={`absolute inset-0 z-0 ${gradient} opacity-25 transition-opacity duration-500`}></div>
            )}

            {/* Background Image (if any) */}
            {image && (
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
                    <img src={image} alt="" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
                </div>
            )}

            <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                <div>
                    <div className="text-gold text-xs font-bold tracking-widest uppercase mb-2 font-kicker">{code}</div>
                    <h3 className={`font-mono text-2xl text-white mb-4 ${wide ? 'max-w-md' : ''}`}>{title}</h3>
                    <p className="text-secondary text-sm leading-relaxed max-w-sm">{description}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-end justify-between">
                    <div>
                        {incentivized && (
                            <div className="text-[10px] text-secondary uppercase tracking-widest mb-1 font-kicker">Incentivized Earning</div>
                        )}
                        <div className="text-xl font-mono text-white">
                            {apy} <span className="text-sm text-secondary">APY</span>
                        </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundCard;

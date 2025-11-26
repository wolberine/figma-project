import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FundCard from '../components/FundCard';
import { useVaults } from '../context/VaultContext';

const Vault = () => {
    const navigate = useNavigate();
    const { vaults } = useVaults();

    const handleVaultClick = (vaultId) => {
        navigate(`/vault/${vaultId}`);
    };

    const flagship = vaults.find(v => v.category === 'flagship');
    const customized = vaults.filter(v => v.category === 'customized');
    const additional = vaults.filter(v => v.category === 'additional');
    const guarantor = vaults.filter(v => v.category === 'guarantor');

    // Gradient mapping for specific vaults
    const getGradient = (code) => {
        switch (code) {
            // NMCXO: High Contrast Blue-Grey (Brighter start, Darker end)
            case 'NMCXO': return 'bg-[linear-gradient(135deg,_#64748b_0%,_#020617_100%)]';
            // NMCUS: Dark with Red Diagonal Beam
            case 'NMCUS': return 'bg-[linear-gradient(115deg,_#09090b_0%,_#3f0e0e_50%,_#09090b_100%)]';
            // NMCCP: Subtle zinc/grey glow from top-left
            case 'NMCCP': return 'bg-[radial-gradient(circle_at_0%_0%,_#27272a_0%,_transparent_50%)]'; // zinc-800
            default: return null;
        }
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 pb-20">

                {/* Hero Section */}
                <div className="py-20 text-center">
                    <h1 className="font-serif italic text-6xl md:text-8xl mb-6">VAULTS</h1>
                    <p className="text-secondary text-lg font-light tracking-wide">Earn yield against insured shipments of commodities</p>
                </div>

                {/* Autopilot Section */}
                <div className="mb-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8">
                        <h2 className="font-serif italic text-5xl md:text-6xl">Autopilot</h2>
                        <p className="text-secondary text-sm max-w-md mt-4 md:mt-0">
                            Automate the deployment of your capital across a sector of the global economy.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-serif italic text-2xl mb-6">Flagship</h3>

                        {/* Flagship Card */}
                        {flagship && (
                            <div
                                onClick={() => handleVaultClick(flagship.id)}
                                className="relative overflow-hidden rounded-sm border border-white/10 min-h-[300px] flex items-center p-8 md:p-12 group cursor-pointer hover:border-white/20 transition-colors"
                            >
                                {/* Abstract Background Gradient - Custom Sampled Colors (Diagonal Reversed) */}
                                <div className="absolute inset-0 bg-[linear-gradient(225deg,_#0a0a0a_0%,_#4a2c1d_45%,_#1f1f1f_100%)] opacity-80"></div>

                                <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end">
                                    <div className="max-w-xl">
                                        <div className="text-gold text-xs font-bold tracking-widest uppercase mb-4">{flagship.code}</div>
                                        <h3 className="font-mono text-3xl md:text-4xl text-white mb-4">{flagship.title}</h3>
                                        <p className="text-secondary text-sm leading-relaxed">
                                            {flagship.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 md:mt-0 text-right">
                                        {flagship.incentivized && (
                                            <div className="text-[10px] text-secondary uppercase tracking-widest mb-2">Incentivized Earning</div>
                                        )}
                                        <div className="text-3xl font-mono text-white">
                                            {flagship.apy} <span className="text-sm text-secondary">APY</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Customized Autopilot Funds */}
                <div className="mb-20">
                    <h3 className="font-serif italic text-2xl mb-8">Customized autopilot funds</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {customized.map(vault => (
                            <FundCard
                                key={vault.id}
                                code={vault.code}
                                title={vault.title}
                                description={vault.description}
                                apy={vault.apy}
                                incentivized={vault.incentivized}
                                gradient={getGradient(vault.code)}
                                onClick={() => handleVaultClick(vault.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Additional Vaults */}
                <div className="mb-20">
                    <h3 className="font-serif italic text-2xl mb-8">Additional vaults</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {additional.map(vault => (
                            <FundCard
                                key={vault.id}
                                code={vault.code}
                                title={vault.title}
                                description={vault.description}
                                apy={vault.apy}
                                incentivized={vault.incentivized}
                                onClick={() => handleVaultClick(vault.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Guarantor Funds */}
                <div className="mb-32">
                    <h3 className="font-serif italic text-2xl mb-8">Guarantor funds</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {guarantor.map(vault => (
                            <FundCard
                                key={vault.id}
                                code={vault.code}
                                title={vault.title}
                                description={vault.description}
                                apy={vault.apy}
                                incentivized={vault.incentivized}
                                onClick={() => handleVaultClick(vault.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-20 border-t border-white/10">
                    <div className="text-xs font-bold tracking-widest uppercase text-secondary mb-4">We're the New Money Company</div>
                    <h2 className="font-serif italic text-5xl md:text-7xl mb-12 max-w-4xl">
                        Creating a new dawn of economic possibility
                    </h2>

                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-white/10 text-white text-xs font-bold tracking-widest uppercase hover:bg-white/20 transition-colors">
                            Speak with an Expert
                        </button>
                        <button className="px-8 py-4 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
                            Apply for Access
                        </button>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Vault;

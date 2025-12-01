import React from 'react';
import Layout from '../components/Layout';

const Shipcoin: React.FC = () => {
    return (
        <Layout>
            <div className="bg-black text-white min-h-screen">
                {/* Hero Section */}
                <div
                    className="relative py-20 text-center bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/assets/how_hero_bg.png)' }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative z-10 container mx-auto px-6">
                        <h1 className="font-serif text-5xl md:text-7xl mb-6">
                            SHIPCOIN <span className="text-gold italic">($SHIP)</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed">
                            The native yield-bearing token of the SHIP Protocol.
                        </p>
                    </div>
                </div>

                {/* Intro Section */}
                <div className="container mx-auto px-6 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-lg text-gray-300 leading-relaxed mb-8">
                            <span className="text-gold font-bold">$SHIP</span> is the native economic token of the SHIP Network - an open, composable credit network for real-world trade. $SHIP is yield-bearing, representing a claim on protocol fees, and is rewarded to Issuers or Merchant Acquirers in the network.
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Participants who hold and stake $SHIP earn proportional yield from protocol activity underwriting global trade flows.
                        </p>
                    </div>
                </div>

                {/* Token Utility Section */}
                <div className="container mx-auto px-6 py-16 border-t border-white/10">
                    <div className="mb-16 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl mb-4">Token Utility</h2>
                        <div className="w-24 h-1 bg-gold mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* 1. Yield Bearing */}
                        <div className="bg-surface border border-white/10 p-8 rounded-sm hover:border-gold/30 transition-colors">
                            <h3 className="font-serif text-2xl mb-4 text-gold">1. Yield Bearing</h3>
                            <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">Claim on Protocol Fees</p>
                            <p className="text-gray-300 mb-4">Staked/locked $SHIP earns a share of protocol fees including:</p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-2">
                                <li>Underwriting fees</li>
                                <li>Network participation fees</li>
                                <li>Dispute and resolution fees</li>
                                <li>Transaction processing fees</li>
                            </ul>
                            <p className="text-gray-500 text-sm mt-4 italic">Yield scales with amount locked and role-specific performance.</p>
                        </div>

                        {/* 2. Issuer / Merchant Acquirer */}
                        <div className="bg-surface border border-white/10 p-8 rounded-sm hover:border-gold/30 transition-colors">
                            <h3 className="font-serif text-2xl mb-4 text-gold">2. Underwriting Roles</h3>
                            <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">Required to Become an Issuer or Merchant Acquirer</p>
                            <p className="text-gray-300 mb-4">To perform underwriting roles, participants must bond dollar-equivalent stablecoins.</p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-white mb-2">Issuers</h4>
                                    <p className="text-sm text-gray-400 mb-2">Underwrite Buyer Creditworthiness (non-payment, defaults, delays).</p>
                                    <p className="text-xs text-gold">Earns: Share of underwriting spreads & boosted protocol fees.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">Merchant Acquirers</h4>
                                    <p className="text-sm text-gray-400 mb-2">Underwrite Dispute & Fraud Risk (disputes, delivery discrepancies).</p>
                                    <p className="text-xs text-gold">Earns: Dispute-resolution fees & boosted protocol-fee flow.</p>
                                </div>
                            </div>
                        </div>

                        {/* 3. Governance */}
                        <div className="bg-surface border border-white/10 p-8 rounded-sm hover:border-gold/30 transition-colors">
                            <h3 className="font-serif text-2xl mb-4 text-gold">3. Governance</h3>
                            <p className="text-gray-300 mb-4">$SHIP holders vote on:</p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-2">
                                <li>Credit and dispute-risk models</li>
                                <li>Protocol fee structures</li>
                                <li>Reserve yield assets</li>
                                <li>Underwriting limits & required stake ratios</li>
                                <li>Oracle standards and validation rules</li>
                            </ul>
                        </div>

                        {/* 4. Network Incentives */}
                        <div className="bg-surface border border-white/10 p-8 rounded-sm hover:border-gold/30 transition-colors">
                            <h3 className="font-serif text-2xl mb-4 text-gold">4. Network Incentives</h3>
                            <p className="text-gray-300 mb-4">$SHIP is used for:</p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-2">
                                <li>Onboarding B2B buyers and suppliers</li>
                                <li>Contributor grants</li>
                                <li>Validator rewards</li>
                                <li>Community growth incentives</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Token Supply Section */}
                <div className="container mx-auto px-6 py-20 border-t border-white/10 bg-white/5">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl mb-4">Token Supply & Allocation</h2>
                            <div className="flex justify-center gap-12 mt-8">
                                <div>
                                    <div className="text-xs text-secondary uppercase tracking-widest mb-2">Total Supply</div>
                                    <div className="text-3xl font-mono text-gold">10 Billion</div>
                                </div>
                                <div>
                                    <div className="text-xs text-secondary uppercase tracking-widest mb-2">Initial Circulating Supply</div>
                                    <div className="text-3xl font-mono text-white">20%</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Community */}
                            <div className="bg-black border border-white/10 p-6 text-center">
                                <div className="text-4xl font-serif text-gold mb-2">59%</div>
                                <div className="text-sm font-bold uppercase tracking-widest text-white mb-4">Community & Ecosystem</div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Market-maker incentives, onboarding, validator rewards, and ecosystem grants.
                                </p>
                            </div>

                            {/* Early Backers */}
                            <div className="bg-black border border-white/10 p-6 text-center">
                                <div className="text-4xl font-serif text-gold mb-2">21%</div>
                                <div className="text-sm font-bold uppercase tracking-widest text-white mb-4">Early Backers</div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Strategic partners supporting infrastructure, liquidity, and supply-chain integrations.
                                </p>
                            </div>

                            {/* Core Contributors */}
                            <div className="bg-black border border-white/10 p-6 text-center">
                                <div className="text-4xl font-serif text-gold mb-2">20%</div>
                                <div className="text-sm font-bold uppercase tracking-widest text-white mb-4">Core Contributors</div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Engineering, product, and risk teams building the protocol and settlement rails.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Shipcoin;

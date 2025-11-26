import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import { supabase } from '../lib/supabase';

const HowItWorks = () => {
    const [phases, setPhases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhases = async () => {
            try {
                const { data, error } = await supabase
                    .from('phases')
                    .select('*')
                    .order('step_number', { ascending: true });

                if (error) throw error;
                setPhases(data || []);
            } catch (error) {
                console.error('Error fetching phases:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhases();
    }, []);

    return (
        <Layout>
            <div className="bg-black text-white min-h-screen">
                {/* Hero Section */}
                <div
                    className="relative py-20 text-center bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/assets/how_hero_bg.png)' }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 container mx-auto px-6">
                        <h1 className="font-serif text-5xl md:text-7xl mb-8">
                            How It <span className="text-gold italic">Works</span>
                        </h1>

                        <div className="max-w-4xl mx-auto space-y-6">
                            <h2 className="font-serif text-3xl md:text-4xl text-white">
                                Introducing <span className="italic">NMC World Service</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto mt-8">
                                <p className="text-lg text-gray-200 font-light leading-relaxed">
                                    This RWAfi protocol is designed to earn institutional-grade yield by backing global trade of real world assets.
                                </p>
                                <p className="text-lg text-gray-200 font-light leading-relaxed">
                                    Provide working capital while goods are in transit, providing more economic opportunities worldwide.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Process Section */}
                <div className="container mx-auto px-6 py-12">
                    <div className="mb-16 text-center">
                        <h2 className="font-serif text-3xl mb-4">The Lifecycle of a Trade</h2>
                        <div className="w-24 h-1 bg-gold mx-auto"></div>
                    </div>

                    <Carousel items={phases} />
                </div>

                {/* Risk Management Section */}
                <div className="container mx-auto px-6 py-24 border-t border-white/10">
                    <div className="mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 italic">Risk management</h2>
                        <p className="text-xl text-gray-400 max-w-4xl font-light leading-relaxed">
                            The NMC World Service protocol utilizes a stack of controls to ensure trades are completed both accurately and efficiently. We are bringing the industry standards including insurance and inspections on-chain to mitigate risk to LPs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Column 1 */}
                        <div className="space-y-16">
                            {/* Oracle */}
                            <div>
                                <h3 className="font-serif text-2xl mb-4 flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gold">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    The oracle for global trade
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    By being the operational and commercial hub for buyer-seller coordination, we are the single source of truth for each transaction. This provides unmatched transparency reducing delays, surprises, and risk.
                                </p>
                            </div>

                            {/* Protocol Risk Controls */}
                            <div>
                                <h3 className="font-serif text-2xl mb-4 flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gold">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                    </svg>
                                    Protocol risk controls
                                </h3>
                                <div className="space-y-6 text-gray-400 leading-relaxed">
                                    <p>
                                        The NMC World Service protocol utilizes a stack of controls to ensure trades are completed. We are bringing the industry standards on-chain to mitigate risk to LPs.
                                    </p>
                                    <p>
                                        Risk control parties are responsible and held financially liable to guarantee that their component of the trade is executed effectively.
                                    </p>
                                    <p>
                                        To ensure accuracy, these entities stake capital and $SHIPCOIN in NMCbg, NMCsg, and NMCre vaults. Should they fail to accurate assess risk, both capital and $SHIPCOIN rewards are reduced or eliminated.
                                    </p>
                                    <p>
                                        Risk control parties have the opportunity to earn a share of rewards, both capital and $SHIPCOIN, by accurate assessing risk and verifying performance of parties involved in the trade.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-16">
                            {/* Dispute Management */}
                            <div>
                                <h3 className="font-serif text-2xl mb-4 flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gold">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                    Protocol level dispute management
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    A component of the protocol assigns a specific adjudication party. This party handles all disputes related to the trade.
                                </p>
                                <div className="bg-gradient-to-br from-green-900/40 to-black border border-green-500/30 p-6 rounded-sm">
                                    <h4 className="font-mono text-green-400 mb-3 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                                        </svg>
                                        Dispute Adjudicator
                                    </h4>
                                    <p className="text-gray-300 text-sm mb-4">
                                        These parties review and adjudicate all disputes levied by buyers, suppliers, transportation, and LPs.
                                    </p>
                                    <p className="text-gray-300 text-sm">
                                        By default, The New Money Group is assigned as adjudicator.
                                    </p>
                                </div>
                            </div>

                            {/* Risk Stack */}
                            <div>
                                <h3 className="font-serif text-2xl mb-6 flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gold">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                    </svg>
                                    Risk stack
                                </h3>
                                <div className="space-y-4">
                                    {/* Performance Guarantors - Purple */}
                                    <div className="bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 p-6 rounded-sm">
                                        <h4 className="font-mono text-purple-400 mb-3 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                            </svg>
                                            Performance Guarantors
                                        </h4>
                                        <p className="text-gray-300 text-sm mb-4">
                                            These guarantors ensure the supplier meets performance requirements for the products they provide. In the event of a dispute related to supplier performance, these guarantors immediately make <span className="text-white font-semibold">LPs whole</span>.
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            When shipment logistics is managed by suppliers, they also hold risk during transit should a loss occur from primary carriers.
                                        </p>
                                    </div>

                                    {/* Credit Underwriters - Orange */}
                                    <div className="bg-gradient-to-br from-orange-900/40 to-black border border-orange-500/30 p-6 rounded-sm">
                                        <h4 className="font-mono text-orange-400 mb-3 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                            </svg>
                                            Credit Underwriters
                                        </h4>
                                        <p className="text-gray-300 text-sm">
                                            These underwriters are responsible for vetting and managing risk related to buyer and supplier financial fitness. This includes setting, adjusting, and limiting credit lines on entities within the trade. They are subject to losses when buyers or suppliers default.
                                        </p>
                                    </div>

                                    {/* Trade Credit Insurers - Pink */}
                                    <div className="bg-gradient-to-br from-pink-900/40 to-black border border-pink-500/30 p-6 rounded-sm">
                                        <h4 className="font-mono text-pink-400 mb-3 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5c0 .621.504 1.125 1.125 1.125h15c.621 0 1.125-.504 1.125-1.125M3.375 14.25V4.75A2.25 2.25 0 015.625 2.5h12.75a2.25 2.25 0 012.25 2.25v9.5" />
                                            </svg>
                                            Trade Credit Insurers & Resolution Agents
                                        </h4>
                                        <p className="text-gray-300 text-sm">
                                            These provide insurance against buyer-non payment. They are assigned first loss when a buyer defaults on payment, and include the responsibility of repossession of trade goods when applicable.
                                        </p>
                                    </div>

                                    {/* Reinsurance Groups - Blue */}
                                    <div className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 p-6 rounded-sm">
                                        <h4 className="font-mono text-blue-400 mb-3 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                            </svg>
                                            Reinsurance Groups
                                        </h4>
                                        <p className="text-gray-300 text-sm">
                                            These provide a secondary level of insurance should any other risk control in the stack fail to pay.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HowItWorks;

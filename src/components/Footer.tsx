import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-background border-t border-white/5 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <div className="mb-8">
                            <h3 className="text-gold font-serif italic text-xl mb-2">The new</h3>
                            <h2 className="text-3xl text-green-800 font-serif tracking-wide mb-1">MONEY</h2>
                            <h2 className="text-3xl text-green-800 font-serif tracking-wide mb-1">PRIVATE LTD</h2>
                            <h4 className="text-green-800/60 font-serif italic">of SINGAPORE</h4>
                        </div>
                        <p className="text-secondary text-xs tracking-widest uppercase">
                            Actual results may vary
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6">Platform</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-secondary hover:text-white text-sm">Premier Support</a></li>
                            <li><a href="#" className="text-secondary hover:text-white text-sm">Coverage</a></li>
                            <li><a href="#" className="text-secondary hover:text-white text-sm">Status</a></li>
                            <li><a href="#" className="text-secondary hover:text-white text-sm">Privacy</a></li>
                            <li><a href="#" className="text-secondary hover:text-white text-sm">Terms</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-secondary hover:text-white text-sm">Help Center</a></li>
                            <li><a href="#" className="text-secondary hover:text-white text-sm">Docs</a></li>
                        </ul>
                        <button className="mt-8 px-8 py-3 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
                            Go Live
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

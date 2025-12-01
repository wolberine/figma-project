import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

const Navbar: React.FC = () => {
    const { login, logout, authenticated, user } = usePrivy();

    const formatAddress = (address: string | undefined) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="text-2xl font-serif text-white tracking-wider">N</div>
                    <div className="text-xs text-secondary tracking-[0.2em] uppercase hidden sm:block font-kicker">
                        The New<br />Money Company
                    </div>
                </div>

                {/* Center Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="/" className="text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors">Vaults</a>
                    <a href="/howitworks" className="text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors">How It Works</a>
                    <a href="/shipcoin" className="text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors">Shipcoin</a>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {authenticated && user?.wallet ? (
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-gold">
                                {formatAddress(user.wallet.address)}
                            </span>
                            <button
                                onClick={logout}
                                className="px-6 py-2 border border-white/20 text-white text-xs font-bold tracking-widest uppercase hover:bg-white/5 transition-colors"
                            >
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={login}
                            className="px-6 py-2 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors"
                        >
                            Connect Wallet
                        </button>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;

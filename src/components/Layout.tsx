import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-white font-sans selection:bg-gold selection:text-black flex flex-col">
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 pt-20">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;

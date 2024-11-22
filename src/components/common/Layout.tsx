import React, { ReactNode } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ParallaxProvider>
      <div className="flex flex-col min-h-screen">
        {/* Sticky Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default Layout;

import React from 'react';
import Navbar from '../navabr/Navbar';
import Footer from '../footer/Footer';
import VerificationBanner from '../banner/VerificationBanner';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <VerificationBanner />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
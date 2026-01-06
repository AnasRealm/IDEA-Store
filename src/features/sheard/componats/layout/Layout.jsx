import React from 'react';
import Navbar from '../navabr/Navbar';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
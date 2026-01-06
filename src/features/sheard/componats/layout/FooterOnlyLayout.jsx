import React from 'react';
import Footer from '../footer/Footer';

const FooterOnlyLayout = ({ children }) => {
  return (
    <>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default FooterOnlyLayout;
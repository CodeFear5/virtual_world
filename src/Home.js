import React from 'react';
import Header from './Header';
import About from './About';
import Services from './Services';
import Features from './Features';
import Contact from './Contact';
import Footer from './Footer';

const Home = () => {
  return (
    <div style={styles.container}>
      <Header />
      <About />
      <Services />
      <Features />
     
      <Contact />
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    overflowY: 'scroll',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default Home;

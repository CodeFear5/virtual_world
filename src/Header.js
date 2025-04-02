import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Welcome to Virtual World</h1>
      <p style={styles.subtitle}>Explore our 3D Viewer and Text Editor tools</p>
      <div style={styles.buttonContainer}>
        <button 
          style={styles.button} 
          onClick={() => navigate('/3d-viewer')}
        >
          Get Started
        </button>
        <button 
          style={{ ...styles.button, ...styles.learnMoreButton }} 
          onClick={handleLearnMore}
        >
          Learn More
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    padding: '100px 0',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    color: '#343a40',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '48px',
    margin: '0 0 20px',
    fontFamily: "'Roboto', sans-serif",
  },
  subtitle: {
    fontSize: '24px',
    margin: 0,
    fontFamily: "'Roboto', sans-serif",
  },
  buttonContainer: {
    marginTop: '30px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    margin: '10px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  learnMoreButton: {
    backgroundColor: '#28a745',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Header;

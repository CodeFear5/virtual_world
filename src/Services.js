import React from 'react';
import { useNavigate } from 'react-router-dom';
import icon1 from './viewer-icon.png';
import icon2 from './text-logo.jpg';

const Services = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.title}>Our Services</h2>
      <div style={styles.cardsContainer}>
        <div style={styles.card} onClick={() => handleNavigation('/3d-viewer')}>
          <button style={styles.button}>
            <img src={icon1} alt="3D Viewer Icon" style={styles.icon} title='3D Viewer and Editor' />
          </button>
          <h3 style={styles.cardTitle}>3D Viewer and Editor</h3>
        </div>
        <div style={styles.card} onClick={() => handleNavigation('/ar-viewer')}>
          <button style={styles.button}>
            <img src={icon2} alt="AR Viewer Icon" style={styles.icon} title='AR Viewer' />
          </button>
          <h3 style={styles.cardTitle}>AR Viewer</h3>
        </div>
      </div>
    </div>
  );
};

const styles = {
  section: {
    padding: '80px 20px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  },
  title: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '40px',
    fontFamily: 'Arial, sans-serif',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    width: '300px',
    height: '400px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    color: '#333',
    margin: '20px',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  hover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
  button: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  },
  icon: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    marginTop: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Services;

import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png'; // Adjust the path to your logo
import { color } from 'three/examples/jsm/nodes/shadernode/ShaderNode.js';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.heading}>Virtual World</h1>
      </div>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/3d-viewer" style={styles.navLink}>3D Viewer</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/ar-viewer" style={styles.navLink}>AR Viewer</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    background: '#333',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed', // Add this line
    width: '100%', // Add this line to ensure it spans the full width
    top: 0, // Add this line to keep it at the top
    zIndex: 1000, // Add this line to make sure it stays on top of other content
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
    background: 'white',
    borderRadius: '50%', // Makes it fully rounded
    padding: '5px' // Adds spacing around the logo
  },

  heading: {
    color: '#fff',
    margin: 0,
    fontSize: '24px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  }
};

export default Navbar;

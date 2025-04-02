import React from 'react';

const Features = () => {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Features</h2>
      <div style={styles.featuresContainer}>
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Import</h3>
          <p style={styles.featureDescription}>Import/upload 3D models from the local storage and Firebase storage also.</p>
        </div>
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Mesh Manipulations</h3>
          <p style={styles.featureDescription}>User can click on any mesh of the model and do manipulations like changing color, position, scale,rotation.</p>
        </div>
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Animations</h3>
          <p style={styles.featureDescription}>User will be able to select the animation and play that in the scene of the uploaded model.</p>
        </div>
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Light Properties</h3>
          <p style={styles.featureDescription}>Light properties consists of 4 types of lights like ambient light, directional light, spot light and point light where changing position and color of the light can be done.</p>
        </div>
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Scene Properties</h3>
          <p style={styles.featureDescription}>Scene properties consists of showing wireframe of entire model, autorotate the model, changing background color, showing grid by changing grid size and divisions</p>
        </div>
        <div style={styles.feature}>
          <h3 style={styles.featureTitle}>Export</h3>
          <p style={styles.featureDescription}>Export/download the modified models to local storage or firebase.</p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '60px 20px',
    textAlign: 'center',
    backgroundColor: '#f4f4f4'
  },
  heading: {
    fontSize: '36px',
    margin: '0 0 20px'
  },
  featuresContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  feature: {
    flex: '1 1 300px',
    margin: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  featureTitle: {
    fontSize: '24px',
    margin: '0 0 10px'
  },
  featureDescription: {
    fontSize: '16px'
  }
};

export default Features;

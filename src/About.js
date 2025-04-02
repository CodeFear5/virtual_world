import React from 'react';

const About = () => {
  return (
    <section id="about-section" style={styles.section}>
      <h2 style={styles.heading}>About Us</h2>
      <p style={styles.text}>
        This application allows users to upload GLTF/GLB files, either from local storage or Firebase, and view them in the scene. The app includes controls for manipulating light which consists of 4 types of lights by changing position and color of the light and scene properties which consists of showing wireframe of entire model, autorotate the model, changing background color, showing grid by changing grid size and divisions, showing the dimensions and mesh hierarchy of the model, playing and pausing animations, on clicking on particular mesh user will be able to see the selected mesh name and can manipulate that mesh by changing its color and with wireframe and transparency, other manipulations like varying position, rotation and scale along x,y,z axes, and exporting edited models back to local storage or Firebase. And also user will be able to select the animation and play that in the scene of the uploaded model.
      </p>
    </section>
  );
};

const styles = {
  section: {
    padding: '60px 20px',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: '36px',
    margin: '0 0 20px',
    color: '#333',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '18px',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
    color: '#555',
  },
};

export default About;

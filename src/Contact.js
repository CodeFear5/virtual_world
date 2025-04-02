import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.send(
      'service_j9su95m', // replace with your service ID
      'template_usft3zo', // replace with your template ID
      formData,
      'uDdxh7dshsl_0knBY' // replace with your user ID
    )
    .then((response) => {
      setSending(false);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      setSending(false);
      setError('Failed to send message. Please try again later.');
    });
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Contact Us</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            style={styles.input} 
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            style={styles.input} 
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Message</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            style={styles.textarea} 
          ></textarea>
        </div>
        <button type="submit" style={styles.button} disabled={sending}>
          {sending ? 'Sending...' : 'Send'}
        </button>
        {sent && <p style={styles.successMessage}>Message sent successfully!</p>}
        {error && <p style={styles.errorMessage}>{error}</p>}
      </form>
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
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'left'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '16px'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '100px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  successMessage: {
    color: 'green',
    marginTop: '10px'
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px'
  }
};

export default Contact;

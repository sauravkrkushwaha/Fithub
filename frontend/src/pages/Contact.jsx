// src/pages/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Us — FITHUB</h1>

      <p style={styles.paragraph}>
        Have questions or need help? We’d love to hear from you!
      </p>

      <div style={styles.infoBox}>
        <p><strong>Email:</strong> <a href="mailto:contact.sauravkrkushwaha@gmail.com">contact.sauravkrkushwaha@gmail.com</a></p>
        <p><strong>Phone:</strong> +91 88640 84387</p>
        <p><strong>Support Hours:</strong> Mon–Sat, 9:00 AM – 6:00 PM IST</p>
      </div>

      <div style={styles.officeBox}>
        <h2 style={styles.subheading}>Our Virtual Office</h2>
        <p>FITHUB, India 🇮🇳</p>
        <p>Building strong bodies — one connection at a time.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: 'auto',
    color: '#333'
  },
  heading: {
    fontSize: '2.5rem',
    color: '#1e90ff',
    marginBottom: '1rem'
  },
  subheading: {
    fontSize: '1.3rem',
    marginTop: '2rem',
    color: '#1e90ff'
  },
  paragraph: {
    marginBottom: '1rem'
  },
  infoBox: {
    backgroundColor: '#f3f3f3',
    padding: '1rem',
    borderRadius: '8px'
  },
  officeBox: {
    marginTop: '2rem',
    backgroundColor: '#f0f8ff',
    padding: '1rem',
    borderRadius: '8px'
  }
};

export default Contact;

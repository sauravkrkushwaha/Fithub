// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us — FITHUB</h1>
      <p style={styles.paragraph}>
        Welcome to <strong>FITHUB</strong>, your ultimate digital companion for achieving fitness goals —
        whether you're a beginner, a seasoned athlete, or a certified coach looking to expand your reach.
      </p>

      <h2 style={styles.subheading}>Who We Are</h2>
      <p style={styles.paragraph}>
        FITHUB is a modern fitness platform that bridges the gap between <strong>clients</strong> and <strong>certified coaches</strong>.
        We help users discover the right training plans, communicate with fitness professionals, and connect with nearby gyms — all from one place.
      </p>

      <h2 style={styles.subheading}>What We Offer</h2>
      <ul style={styles.list}>
        <li>Certified Coaches (Yoga, Fat Loss, Strength Training, etc.)</li>
        <li>Flexible Subscription Plans – 1, 3, 6, or 12 months</li>
        <li>Real-time Chat with Trainers</li>
        <li>Location-based Gym and Trainer Discovery</li>
        <li>Secure Logins for Clients & Trainers</li>
      </ul>

      <h2 style={styles.subheading}>Join Us</h2>
      <p style={styles.paragraph}>
        We’re not just a platform. We’re a <strong>community</strong> committed to your health, strength, and transformation.
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.7',
    color: '#333',
    maxWidth: '800px',
    margin: 'auto'
  },
  heading: {
    fontSize: '2.5rem',
    color: '#1e90ff',
    marginBottom: '1rem'
  },
  subheading: {
    fontSize: '1.5rem',
    color: '#1e90ff',
    marginTop: '2rem'
  },
  paragraph: {
    marginTop: '0.5rem'
  },
  list: {
    marginLeft: '1.5rem',
    marginTop: '1rem'
  }
};

export default About;

import React from "react";
import './PrivacyPolicy.css'; // Custom CSS

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <h2>Privacy Policy</h2>
      <p className="effective-date">Effective Date: May 21, 2025</p>

      <p>
        Welcome to Fithub! This Privacy Policy explains how we collect, use,
        and protect your personal information when you use our fitness platform
        to connect with certified trainers.
      </p>

      <h4>1. Information We Collect</h4>
      <ul>
        <li><strong>Personal Information:</strong> Name, email, phone number, age, and fitness goals when you sign up or use our services.</li>
        <li><strong>Account Details:</strong> Login credentials, preferences, and selected trainer profiles.</li>
        <li><strong>Usage Data:</strong> Information about how you use the app, including session duration, messages, and interactions with trainers.</li>
      </ul>

      <h4>2. How We Use Your Information</h4>
      <ul>
        <li>To connect you with certified trainers based on your preferences.</li>
        <li>To provide a personalized fitness experience.</li>
        <li>To send updates, reminders, or support messages.</li>
        <li>To improve our platform’s performance and security.</li>
      </ul>

      <h4>3. Sharing of Information</h4>
      <p>
        We do not sell or rent your personal data. We may share information:
      </p>
      <ul>
        <li>With certified trainers, as necessary for providing services.</li>
        <li>With service providers helping us operate the platform (e.g., payment or email services).</li>
        <li>As required by law or to protect our users and platform.</li>
      </ul>

      <h4>4. Your Rights and Choices</h4>
      <ul>
        <li>You can update or delete your profile at any time.</li>
        <li>You can request access to your data or opt out of communications.</li>
      </ul>

      <h4>5. Data Security</h4>
      <p>
        We use industry-standard security measures to protect your data.
        However, no system is 100% secure, so we recommend using strong
        passwords and logging out after use.
      </p>

      <h4>6. Children’s Privacy</h4>
      <p>
        Our platform is not intended for users under the age of 13. We do not
        knowingly collect data from children.
      </p>

      <h4>7. Changes to This Policy</h4>
      <p>
        We may update this policy from time to time. Changes will be posted on
        this page with a new effective date.
      </p>

      <h4>8. Contact Us</h4>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at{" "}
        <a href="mailto:support@fithub.com">support@fithub.com</a>.
      </p>
    </div>
  );
}

export default PrivacyPolicy;

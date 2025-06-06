import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupChoice.css'; // styling file
import Signup from './Signup';
import CoachForm from './CoachForm';


function SignupChoice() {
  const navigate = useNavigate();
  return (
    <div className="signup-choice-container">
      <div className="signup-choice-box">
        <h2>Choose Signup Type</h2>
        <div className="button-group">
          <button className="choice-btn" onClick={() => navigate('/Signup')}>
            Signup as Client
          </button>
          <button className="choice-btn" onClick={() => navigate('/coach-form')}>
            Signup as Coach
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupChoice;

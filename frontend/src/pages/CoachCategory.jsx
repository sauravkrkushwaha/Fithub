import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import imagePt from '../assets/image/personal_training_d154e7f2e9.webp';
import imageIr from '../assets/image/injury_rehab_e9a0a93435.webp';
import { useNavigate } from 'react-router-dom';

import './CoachCategory.css'; // Import custom CSS

function CoachCategory() {
    const navigate = useNavigate();

    return (
        <div className="coach-category-container">
            <h1 className="text-center mb-4">Choose Your Coach</h1>
            <div className="card-wrapper">
                <Card className="custom-card">
                    <Card.Img variant="top" src={imagePt} className="custom-card-img" />
                    <Card.Body>
                        <Card.Title className="custom-card-title">Online Personal Training</Card.Title>
                        <Card.Text className="custom-card-text">
                            1-on-1 online sessions for Yoga, Zumba & more! Get fit with our expert trainers from the comfort of your home.
                        </Card.Text>
                        <Button
                            variant="outline-dark"
                            onClick={() => navigate('/coach-list?coachType=strength-training')}
                            className="custom-button"
                            block
                        >
                            View Coaches
                        </Button>
                    </Card.Body>
                </Card>

                <Card className="custom-card">
                    <Card.Img variant="top" src={imageIr} className="custom-card-img" />
                    <Card.Body>
                        <Card.Title className="custom-card-title">Injury Rehabilitation</Card.Title>
                        <Card.Text className="custom-card-text">
                            Bid pain goodbye with our expert physiotherapists. Get personalized care and support for your recovery journey.
                        </Card.Text>
                        <Button
                            variant="outline-dark"
                            onClick={() => navigate('/coach-list?coachType=injury-rehab')}
                            className="custom-button"
                            block
                        >
                            View Coaches
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CoachCategory;
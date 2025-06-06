import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import FrontBody from "../components/FrontBody";
import BackBody from "../components/BackBody";
import "./LandingPage.css"; // Import custom CSS for styling

function LandingPage() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleBodyPartClick = (bodyPart) => {
        navigate(`/body-exercise/${bodyPart}`); // Navigate to BodyExercise with the body part as a parameter
    };

    return (
        <div className="landing-page">
            <FrontBody onBodyPartClick={handleBodyPartClick} />
            <BackBody onBodyPartClick={handleBodyPartClick} />
        </div>
    );
}

export default LandingPage;
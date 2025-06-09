import React from "react";
import { useNavigate } from "react-router-dom";
import FrontBody from "../components/FrontBody";
import BackBody from "../components/BackBody";
import "./LandingPage.css";
import gymBg from "../assets/image/gym.jpg"; // Add this line

function LandingPage() {
    const navigate = useNavigate();

    const handleBodyPartClick = (bodyPart) => {
        navigate(`/body-exercise/${bodyPart}`);
    };

    return (
        <div className="landing-bg">
            <div className="d-flex flex-column justify-content-center align-items-center landing-content">
                <h2 className="text-center">Welcome to fithub</h2>
                <p>your personalized fitness journey starts here</p>
                <p>join as a coach or a client, let's redefine fitness together</p>
            </div>

            <div className="landing-page">
                <FrontBody onBodyPartClick={handleBodyPartClick} />
                <BackBody onBodyPartClick={handleBodyPartClick} />
            </div>
        </div>
    );
}

export default LandingPage;
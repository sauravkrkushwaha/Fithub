import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import imagePt from '../assets/image/personal_training_d154e7f2e9.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";
import './CoachList.css';
import axios from "axios";

function CoachList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [coaches, setCoaches] = useState([]);

    // Helper to get query param
    function useQuery() {
        return new URLSearchParams(location.search);
    }
    const query = useQuery();
    const coachType = query.get("coachType");

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                let url = "http://localhost:5000/api/trainer/coach-list";
                if (coachType) {
                    url += `?coachType=${encodeURIComponent(coachType)}`;
                }
                const res = await axios.get(url);
                console.log("coaches", res.data);
                setCoaches(res.data);
            } catch (err) {
                setCoaches([]);
            }
        };
        fetchCoaches();
    }, [coachType]);

    return (
        <div className="coach-list-container p-4 my-4">
            <Row className="g-4 justify-content-center">
                {coaches.map((coach) => (
                    <Col md={4} sm={6} xs={12} key={coach._id}>
                        <Card className="custom-card">
                            <Card.Img
                                variant="top"
                                src={coach.profilePhoto ? `http://localhost:5000${coach.profilePhoto}` : imagePt}
                                className="custom-card-img"
                            />
                            <Card.Body>
                                <Card.Title className="custom-card-title">{coach.name}</Card.Title>
                                <Card.Text className="custom-card-text">
                                    {coach.averageRating ? coach.averageRating.toFixed(1) : "N/A"} &#11088; | {coach.speciality && coach.speciality.join(", ")}
                                </Card.Text>
                                <div className="button-container">
                                    <Button
                                        variant="outline-dark"
                                        className="message-button"
                                        onClick={() => navigate(`/chat/${coach._id}`)}
                                    >
                                        <FontAwesomeIcon icon={faMessage} size="4x"/>
                                    </Button>
                                    <Button
                                        variant="outline-dark"
                                        className="view-profile-button w-100"
                                        onClick={() => navigate(`/coach-profile/${coach._id}`)}
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default CoachList;
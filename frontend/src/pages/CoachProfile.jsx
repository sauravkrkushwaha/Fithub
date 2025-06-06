// import React from "react};
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import imageIr from '../assets/image/injury_rehab_e9a0a93435.webp';
import './CoachProfile.css';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CloseButton from 'react-bootstrap/CloseButton'; // Add this import at the top

// Custom styled Rating component
const CustomRating = styled(Rating)({
    '& .MuiRating-icon': {
        fontSize: '5rem', // Increase the size of the stars
    },
    '& .MuiRating-iconEmpty': {
        color: '#ddd', // Optional: Change the color of empty stars
    },
});

function CoachProfile() {
    const { id } = useParams();
    const [coach, setCoach] = useState(null);
    const [visibleReviews, setVisibleReviews] = useState(4);
    const [userRating, setUserRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    useEffect(() => {
        const fetchCoach = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/trainer/${id}`);
                console.log("coach", res.data);
                setCoach(res.data);
            } catch (err) {
                console.error("Failed to fetch coach:", err);
            }
        };
        fetchCoach();
    }, [id]);

    // Prevent rendering until coach data is loaded
    if (!coach) {
        return <div>Loading...</div>;
    }

    // Get values independently from localStorage
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("userName");
    const userType = localStorage.getItem("userType");

    // Use username from localStorage for myUserName (fallback to "Anonymous" if not set)
    const myUserName = username || "Anonymous";

    // Determine if this is the coach's own profile
    const isCoachProfile = userType === "coach" && (username === coach.username || username === coach.name);

    const handlePostReview = async () => {
        if (!userRating || !reviewText.trim()) return;
        try {
            const res = await axios.post(`http://localhost:5000/api/trainer/${id}/review`, {
                userName: myUserName,
                rating: userRating,
                comment: reviewText
            });
            setCoach(res.data);
            setReviewText("");
            setUserRating(0);
        } catch (err) {
            alert("Failed to post review");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:5000/api/trainer/${id}/review/${reviewId}`);
            const res = await axios.get(`http://localhost:5000/api/trainer/${id}`);
            setCoach(res.data);
        } catch (err) {
            alert("Failed to delete review");
        }
    };

    return (
        <div className="main-container">
            <div className="profile-header">
                <img src={coach.profilePhoto ? `http://localhost:5000${coach.profilePhoto}` : imageIr} alt="profile" className="profile-image" />
                <div className="coach-info">
                    <h1 className="name">{coach.name}</h1>
                    <p className="specialty">Specialty: {coach.speciality && coach.speciality.join(", ")}</p>
                </div>
                {/* Show Chat with Coach button only for client users */}
                {userType === "client" && (
                    <Button
                        variant="outline-dark"
                        // className="message-button"
                        onClick={() => window.location.href = `/chat/${coach._id}`}
                    >
                        <FontAwesomeIcon icon={faMessage} />
                        &nbsp;
                        Chat with Coach
                    </Button>
                )}
            </div>
            <div className="about-me-card">
                <h3 className="about">About Me</h3>
                <p className="description">{coach.about}</p>
            </div>
            <div className="achievement">
                <div className="speciality-card">
                    <h3 className="title">Speciality</h3>
                    <div className="speciality-item">
                        {coach.speciality && coach.speciality.map((spec, idx) => (
                            <p className="speciality-text" key={idx}>{spec}</p>
                        ))}
                    </div>
                </div>
                <div className="certificates-card">
                    <h3 className="title">Certificates</h3>
                    <div className="certificate-item">
                        {coach.certifications && coach.certifications.map((cert, idx) => (
                            <p className="certificate-text" key={idx}>{cert}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="package">
                <h3 className="title">Choose Your Package</h3>
                <div className="plan">
                    <div className="plan-option">
                        <span className="plan-name">Monthly Package</span>
                        <div className="price-container">
                            <span className="plan-price">${coach.planPrices?.monthly}</span>
                            <span className="original-price" style={{ textDecoration: "line-through", color: "#888", marginLeft: "8px" }}>
                                ${coach.planPrices?.monthly ? (coach.planPrices.monthly * 1.2).toFixed(0) : ""}
                            </span>
                        </div>
                    </div>
                    <div className="plan-option">
                        <span className="plan-name">Quarterly Package</span>
                        <div className="price-container">
                            <span className="plan-price">${coach.planPrices?.quarterly}</span>
                            <span className="original-price" style={{ textDecoration: "line-through", color: "#888", marginLeft: "8px" }}>
                                ${coach.planPrices?.quarterly ? (coach.planPrices.quarterly * 1.2).toFixed(0) : ""}
                            </span>
                        </div>
                    </div>
                    <div className="plan-option">
                        <span className="plan-name">Half-Yearly Package</span>
                        <div className="price-container">
                            <span className="plan-price">${coach.planPrices?.halfYearly}</span>
                            <span className="original-price" style={{ textDecoration: "line-through", color: "#888", marginLeft: "8px" }}>
                                ${coach.planPrices?.halfYearly ? (coach.planPrices.halfYearly * 1.2).toFixed(0) : ""}
                            </span>
                        </div>
                    </div>
                    <div className="plan-option">
                        <span className="plan-name">Yearly Package</span>
                        <div className="price-container">
                            <span className="plan-price">${coach.planPrices?.yearly}</span>
                            <span className="original-price" style={{ textDecoration: "line-through", color: "#888", marginLeft: "8px" }}>
                                ${coach.planPrices?.yearly ? (coach.planPrices.yearly * 1.2).toFixed(0) : ""}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews">
                <h3 className="title">Review</h3>
                <div className="rating-container">
                    {/* Only show rating input if NOT viewing own profile */}
                    {!isCoachProfile && (
                        <div className="rating-input">
                            <CustomRating
                                name="simple-controlled"
                                value={userRating}
                                onChange={(event, newValue) => setUserRating(newValue)}
                                size="large"
                                icon={<StarIcon fontSize="inherit" />}
                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            />
                        </div>
                    )}
                    <div className="avg-rating">
                        <p className="avgRating-text">Average Rating</p>
                        <div className="avgRating-value-container">
                            <h1 className="avgRating-value">{coach.averageRating ? coach.averageRating.toFixed(1) : "N/A"}</h1>
                            <h1 className="avgRating-text">/5</h1>
                        </div>
                        <Rating name="half-rating-read" value={coach.averageRating || 0} precision={0.1} readOnly size="large" />
                    </div>
                </div>

                {/* Only show add review section if NOT viewing own profile */}
                {!isCoachProfile && (
                    <div className="add-review">
                        <textarea
                            className="review-textarea"
                            placeholder="Write your review here..."
                            rows="4"
                            value={reviewText}
                            onChange={e => setReviewText(e.target.value)}
                        />
                        <Button variant="outline-dark" className="post-review-button" onClick={handlePostReview}>
                            Post
                        </Button>
                    </div>
                )}

                {/* Reviews Section */}
                <div className="reviews-box">
                    <Row className="g-4">
                        {coach.reviews && coach.reviews.slice(0, visibleReviews).map((review, idx) => (
                            <Col md={6} xs={12} key={idx}>
                                <div className="review-card" style={{ position: "relative" }}>
                                    {/* Show delete button only for my own review and not on coach's own profile */}
                                    {!isCoachProfile && review.userName === myUserName && (
                                        <CloseButton
                                            style={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}
                                            onClick={() => handleDeleteReview(review._id)}
                                            title="Delete review"
                                        />
                                    )}
                                    <div className="review-author">
                                        <img src={imageIr} alt="profile" className="review-image" />
                                        <h4 className="reviewer-name">{review.userName}</h4>
                                        <p className="review-date">{review.date && new Date(review.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="review-content">
                                        {/* Show rating as stars */}
                                        <Rating
                                            name={`user-rating-readonly-${idx}`}
                                            value={review.rating}
                                            readOnly
                                            size="medium"
                                            icon={<StarIcon fontSize="inherit" />}
                                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                        />
                                        <p className="review-text">{review.comment}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    {coach.reviews && visibleReviews < coach.reviews.length && (
                        <div className="load-more-container">
                            <Button variant="outline-dark" onClick={() => setVisibleReviews(v => v + 4)}>
                                Load More
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CoachProfile;
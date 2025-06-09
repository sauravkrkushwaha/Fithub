import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './UserProfile.css';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  // Simulate getting userInfo and userType from localStorage or wherever you store them
  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
  const userType = userInfo?.type || "";  // adjust this based on how userType is stored

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data.user))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch profile")
      );
  }, []);

  if (error) {
    return <div className="error-text">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="loading-text">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <h1 className="welcome-heading">Welcome to Fithub</h1>
      <div className="user-details">
        <p className="username">Username: <span>{profile.username}</span></p>
        <p className="email">Email: <span>{profile.email}</span></p>
      </div>

      {userInfo && userType === "client" && (
        <div className="coach-box">
          <Nav.Link as={Link} to="/coach-category" className="coach-link">
            Get a coach
          </Nav.Link>
        </div>
      )}
    </div>
  );
}

export default UserProfile;

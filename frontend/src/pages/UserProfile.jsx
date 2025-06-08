import React, { useEffect, useState } from "react";
import axios from "axios";
import './UserProfile.css'; // Import your CSS file

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch profile");
      });
  }, []);

  if (error) {
    return <div className="error-text">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="loading-text">Loading profile...</div>;
  }

  return (
    <div className="user-profile-card">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
    </div>
  );
}

export default UserProfile;

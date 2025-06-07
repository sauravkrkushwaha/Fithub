import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer prefix
        },
      })
      .then((res) => {
        console.log("Profile data:", res.data);
        setProfile(res.data.user); // ✅ Only set the user object
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || "Failed to fetch profile");
      });
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      {/* Add more fields if available */}
    </div>
  );
}

export default UserProfile;

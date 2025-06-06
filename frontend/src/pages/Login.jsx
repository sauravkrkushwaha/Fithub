import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginType, setLoginType] = useState("client"); // "client" or "coach"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload: use 'username' for client, 'name' for coach
    const payload = { username: formData.username, password: formData.password };

    // Determine endpoint
    const endpoint =
      loginType === "coach"
        ? "http://localhost:5000/api/trainer/login"
        : "http://localhost:5000/api/user/login";

    try {
      const res = await axios.post(endpoint, payload);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", loginType);
      localStorage.setItem("userId", res.data._id); // Save userId for profile navigation
      localStorage.setItem("userEmail", res.data.email); // Save user email
      localStorage.setItem("userName", res.data.username); // Save username or name

      if (loginType === "coach") {
        // Save coachId for profile navigation
        localStorage.setItem("coachId", res.data._id); // <-- Add this line
        navigate(`/coach-profile/${res.data._id}`);
      } else {
        navigate("/coach-category");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center mb-4">Login</h2>
      <Form onSubmit={handleSubmit}>
        {/* Login Type */}
        <Form.Group className="mb-3" controlId="formLoginType">
          <Form.Label>Login As</Form.Label>
          <Form.Select
            value={loginType}
            onChange={(e) => setLoginType(e.target.value)}
            required
          >
            <option value="client">Client</option>
            <option value="coach">Coach</option>
          </Form.Select>
        </Form.Group>

        {/* Username or Name */}
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Error Message */}
        {error && <div className="text-danger text-center mb-3">{error}</div>}

        <Button variant="dark" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;

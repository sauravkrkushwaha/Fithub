import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/user/signup", {
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            });

            setSuccess(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userType", "client"); // Set user type as "user"
            localStorage.setItem("userId", res.data._id); // Save userId for profile navigation
            // localStorage.setItem("userEmail", res.data.email); // Save user email
            localStorage.setItem("userName", res.data.username); // Save username or name

            setTimeout(() => navigate("/coach-category"), 1000);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="signup-container">
            <h2 className="text-center mb-4">Signup</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                    />
                </Form.Group>

                {error && <div className="text-danger text-center mb-2">{error}</div>}
                {success && <div className="text-success text-center mb-2">{success}</div>}

                <Button variant="dark" type="submit" className="w-100">Signup</Button>

                <div className="text-center mt-3">
                    <Button variant="link" onClick={() => navigate("/login")}>
                        Already have an account? Login
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Signup;

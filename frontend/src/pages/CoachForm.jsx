import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CoachForm.css";

function CoachForm() {
    const navigate = useNavigate();
    const { id } = useParams(); // <-- get id param for edit mode
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        email: "",
        phone: "",
        about: "",
        speciality: "",
        coachType: "",
        certifications: "", // <-- use certifications here
        planPrices: {
            monthly: "",
            quarterly: "",
            halfYearly: "",
            yearly: "",
        },
        profilePhoto: null,
        password: ""
    });

    // Fetch coach data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchCoach = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/trainer/${id}`);
                    setFormData({
                        username: res.data.username || "",
                        name: res.data.name || "",
                        email: res.data.email || "",
                        phone: res.data.phone || "",
                        about: res.data.about || "",
                        speciality: (res.data.speciality || []).join(", "),
                        coachType: res.data.coachType || "", // fix: use coachType
                        certifications: (res.data.certifications || []).join(", "), // <-- fix here
                        planPrices: res.data.planPrices || {
                            monthly: "",
                            quarterly: "",
                            halfYearly: "",
                            yearly: "",
                        },
                        profilePhoto: null,
                        password: "" // Don't prefill password
                    });
                } catch (err) {
                    alert("Failed to fetch coach data");
                }
            };
            fetchCoach();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (["monthly", "quarterly", "halfYearly", "yearly"].includes(name)) {
            setFormData(prev => ({
                ...prev,
                planPrices: { ...prev.planPrices, [name]: value },
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, profilePhoto: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("about", formData.about);
        data.append("coachType", formData.coachType);

        // Speciality
        const specialityArr = typeof formData.speciality === "string"
            ? formData.speciality.split(",").map(s => s.trim()).filter(Boolean)
            : formData.speciality;
        data.append("speciality", JSON.stringify(specialityArr));

        // Certifications
        const certificationsArr = typeof formData.certifications === "string"
            ? formData.certifications.split(",").map(s => s.trim()).filter(Boolean)
            : formData.certifications;
        data.append("certifications", JSON.stringify(certificationsArr));

        data.append("planPrices", JSON.stringify(formData.planPrices));
        if (formData.profilePhoto) data.append("profilePhoto", formData.profilePhoto);
        data.append("phone", formData.phone);

        // Only send these fields on registration
        if (!isEditMode) {
            data.append("email", formData.email);
            data.append("username", formData.username);
            data.append("password", formData.password);
        } else if (formData.password && formData.password.trim() !== "") {
            // Only send password if user entered a new one during edit
            data.append("password", formData.password);
        }

        try {
            if (isEditMode) {
                await axios.put(
                    `http://localhost:5000/api/trainer/${id}`,
                    data,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                alert("Profile updated successfully!");
                navigate(`/coach-profile/${id}`);
            } else {
                const res = await axios.post(
                    "http://localhost:5000/api/trainer/signup",
                    data,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userName", res.data.username);
                localStorage.setItem("userType", "coach");
                localStorage.setItem("userId", res.data._id);
                navigate(`/coach-profile/${res.data._id}`);
            }
        } catch (err) {
            alert(err.response?.data?.error || (isEditMode ? "Failed to update profile" : "Signup failed"));
        }
    };

    return (
        <div className="coach-form-container">
            <h2 className="text-center mb-4">{isEditMode ? "Edit Profile" : "Coach Registration"}</h2>
            <Form onSubmit={handleSubmit}>
                {/* Username (only for registration) */}
                {!isEditMode && (
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                )}

                {/* Email (only for registration) */}
                {!isEditMode && (
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                )}

                {/* Password (only for registration) */}
                {!isEditMode && (
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                )}

                {/* Name */}
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Phone Number */}
                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* About */}
                <Form.Group className="mb-3" controlId="formAbout">
                    <Form.Label>About Yourself</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Speciality */}
                <Form.Group className="mb-3" controlId="formSpeciality">
                    <Form.Label>Your Speciality (comma separated)</Form.Label>
                    <Form.Control
                        type="text"
                        name="speciality"
                        value={formData.speciality}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Coach Type */}
                <Form.Group className="mb-3" controlId="formCoachType">
                    <Form.Label>Coach Type</Form.Label>
                    <Form.Select
                        name="coachType"
                        value={formData.coachType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Coach Type</option>
                        <option value="strength-training">Strength Training</option>
                        <option value="injury-rehab">Injury Rehab</option>
                    </Form.Select>
                </Form.Group>

                {/* Certificates */}
                <Form.Group className="mb-3" controlId="formCertifications">
                    <Form.Label>Certifications (comma separated)</Form.Label>
                    <Form.Control
                        type="text"
                        name="certifications" // <-- fix here
                        value={formData.certifications}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Plan Prices */}
                <Form.Group className="mb-3">
                    <Form.Label>Plan Prices</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Monthly"
                        name="monthly"
                        value={formData.planPrices.monthly}
                        onChange={handleChange}
                        required
                    />
                    <Form.Control
                        type="number"
                        placeholder="Quarterly"
                        name="quarterly"
                        value={formData.planPrices.quarterly}
                        onChange={handleChange}
                        required
                        className="mt-2"
                    />
                    <Form.Control
                        type="number"
                        placeholder="Half-Yearly"
                        name="halfYearly"
                        value={formData.planPrices.halfYearly}
                        onChange={handleChange}
                        required
                        className="mt-2"
                    />
                    <Form.Control
                        type="number"
                        placeholder="Yearly"
                        name="yearly"
                        value={formData.planPrices.yearly}
                        onChange={handleChange}
                        required
                        className="mt-2"
                    />
                </Form.Group>

                {/* Profile Photo */}
                <Form.Group className="mb-3">
                    <Form.Label>Profile Photo</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">
                    {isEditMode ? "Save Changes" : "Register as Coach"}
                </Button>
            </Form>
            </div>
        
    );
}

export default CoachForm;

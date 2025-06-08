import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useLocation } from "react-router-dom";
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');

    const isOnOwnCoachProfile =
        userInfo &&
        userType === "coach" &&
        userId &&
        location.pathname === `/coach-profile/${userId}`;

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Navbar.Brand as={Link} to="/">
                FITHUB
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav className="d-flex align-items-center">
    {userInfo && userType === "client" && (
        <Nav.Link as={Link} to="/coach-category">Get a coach</Nav.Link>
    )}

    {userInfo && (
        <Nav.Link as={Link} to="/profile">
            <Button variant="outline-success" className="mx-2">My Profile</Button>
        </Nav.Link>
    )}

    {isOnOwnCoachProfile ? (
        <Button
            as={Link}
            to={`/coach-edit/${userId}`}
            variant="outline-primary"
            className="mx-2"
            style={{ fontWeight: "bold" }}
        >
            Edit Profile
        </Button>
    ) : (
        userInfo && userType === "coach" && userId && (
            <Nav.Link as={Link} to={`/coach-profile/${userId}`}>
                My Coach Profile
            </Nav.Link>
        )
    )}

    {userInfo && (
        <Nav.Link as={Link} to="/chat-list">
            <Button variant="secondary" className="mx-2">Chat List</Button>
        </Nav.Link>
    )}

    {userInfo ? (
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
    ) : (
        <>
            <Nav.Link as={Link} to="/login">
                <Button variant="dark">Login</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/signup-choice">
                <Button variant="outline-dark">Signup</Button>
            </Nav.Link>
        </>
    )}
</Nav>

            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId'); // changed from coachId to userId

    const isOnOwnCoachProfile =
        userInfo &&
        userType === "coach" &&
        userId &&
        location.pathname === `/coach-profile/${userId}`; // changed from coachId to userId

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId'); // changed from coachId to userId
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
                    {/* Show Edit Profile button only if coach is viewing their own profile */}
                    {isOnOwnCoachProfile ? (
                        <Button
                            as={Link}
                            to={`/coach-edit/${userId}`} // changed from coachId to userId
                            variant="outline-primary"
                            className="mx-2"
                            style={{ fontWeight: "bold" }}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        // Otherwise show My Profile button for coach
                        userInfo && userType === "coach" && userId && (
                            <Nav.Link as={Link} to={`/coach-profile/${userId}`}> {/* changed from coachId to userId */}
                                My Profile
                            </Nav.Link>
                        )
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
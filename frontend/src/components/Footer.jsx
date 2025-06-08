import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Footer.css';

function Footer() {
    return (
        <Navbar bg="dark" variant="dark" className="mt-auto py-3 px-4 d-flex justify-content-between">
            <Navbar.Brand as={Link} to="/">Fithub</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                <Nav.Link as={Link} to="/privacypolicy">Privacy Policy</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="https://facebook.com" target="_blank">Facebook</Nav.Link>
                <Nav.Link href="https://twitter.com" target="_blank">Twitter</Nav.Link>
                <Nav.Link href="https://instagram.com" target="_blank">Instagram</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Footer;

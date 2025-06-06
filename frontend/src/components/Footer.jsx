import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css'; // Import custom CSS for footer styling

function Footer() {
    return (
        <Navbar bg="dark" variant="dark" className="mt-auto py-3">
            
                <Navbar.Brand href="#home">Fithub</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#about">About Us</Nav.Link>
                    <Nav.Link href="#contact">Contact</Nav.Link>
                    <Nav.Link href="#privacy">Privacy Policy</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#facebook">Facebook</Nav.Link>
                    <Nav.Link href="#twitter">Twitter</Nav.Link>
                    <Nav.Link href="#instagram">Instagram</Nav.Link>
                </Nav>
            
        </Navbar>
    );
}

export default Footer;
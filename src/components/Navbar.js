import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AppNavbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="nav-logo">Ethereal Blooms</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links align-items-center">
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/gallery"><Nav.Link>Our Art Works</Nav.Link></LinkContainer>
            
            {/* New Link for the Decorator Marketplace */}
            <LinkContainer to="/organizers"><Nav.Link>Find a Decorator</Nav.Link></LinkContainer>
            
            <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
            <LinkContainer to="/contact"><Nav.Link>Contact</Nav.Link></LinkContainer>
            
            {/* This is the dynamic part */}
            {user ? (
              <>
                <LinkContainer to="/review"><Nav.Link>Leave a Review</Nav.Link></LinkContainer>
                <Button variant="link" onClick={handleLogout} className="nav-link">Logout</Button>
              </>
            ) : (
              <>
                <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
                <LinkContainer to="/signup"><Nav.Link>Sign Up</Nav.Link></LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;


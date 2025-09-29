// /client/src/components/Navbar.js
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'; // We'll install this next
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => { // Renamed to avoid conflict
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="nav-logo">Ethereal Blooms</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/gallery">
              <Nav.Link>Our Art Works</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About Ethereal Blooms</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact Ethereal Blooms</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link>SignUp</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/review">
              <Nav.Link>review</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
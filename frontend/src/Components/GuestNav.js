import { Navbar, Container } from 'react-bootstrap';
import './guestnav.css';

const GuestNav = ({setMobileSidebarOpen}) => {
  
  return (
    <Navbar className='ibfp-nav' expand="lg">
      <Container fluid className='ibfp-nav-container'>
        <Navbar.Brand href="/" className='ibfp-brand'>
          WhatoCook
        </Navbar.Brand>
                    <button
              className="ibfp-btn ibfp-mobileOnlyBtn ibfp-burgerBtn"
              onClick={() => setMobileSidebarOpen(true)}
              type="button"
              aria-label="Open ingredients menu"
            >
              <span aria-hidden="true">☰</span>
            </button>
        <span className='ibfp-tagline'>Find recipes from what you have</span>
      </Container>
    </Navbar>
  );
};

export default GuestNav;

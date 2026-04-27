import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import './guestnav.css';

const GuestNav = () => {
  return (
    <Navbar className='ibfp-nav' expand="lg">
      <Container fluid className='ibfp-nav-container'>
        <Navbar.Brand href="/" className='ibfp-brand'>
          WhatCanICook
        </Navbar.Brand>
        <span className='ibfp-tagline'>Find recipes from what you have</span>
      </Container>
    </Navbar>
  );
};

export default GuestNav;

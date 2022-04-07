import React from 'react';
import {Navbar,Container,NavDropdown,Form,FormControl,Button,Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GuestNav = () => {
  return (
    <Navbar  className='navbar' expand="lg" fixed="top">
  <Container fluid style={{margin:"0 10%"}}>
    <Navbar.Brand href="/">  FEEDERS </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
       
        <Nav.Link href='/products' >Recipes</Nav.Link>
   
      
      </Nav>
      <Form className="d-flex justify-content-between ">
        <Link to="/signup">        
        <Button  variant="outline-success"><i class="fa fa-user-plus" aria-hidden="true"></i>
Sign Up</Button>
        </Link>
        <Link to="/signin">
        <Button style={{marginLeft:"10px"}} variant="outline-success"><i class="fa fa-sign-in" aria-hidden="true"></i>Login</Button>
        </Link>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};

export default GuestNav;

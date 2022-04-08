import React from 'react';
import {Navbar,Container,Form,Button,Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom';


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
        <Button  variant="outline-success"><i className="fa fa-user-plus" aria-hidden="true"></i>
Sign Up</Button>
        </Link>
        <Link to="/signin">
        <Button style={{marginLeft:"10px"}} variant="outline-success"><i className="fa fa-sign-in" aria-hidden="true"></i>Login</Button>
        </Link>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};

export default GuestNav;

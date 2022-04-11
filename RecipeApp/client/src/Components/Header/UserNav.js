import React from 'react';
import {Navbar,Container,NavDropdown,Form,Nav,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../JS/actions/authActions'
import "./header.css"
const UserNav = () => {

   const dispatch = useDispatch()
   const role = useSelector((state) => state.authReducer.user.role);

   

 
  return (
    <Navbar className='navbar' expand="lg" fixed="top" >
  <Container fluid style={{margin:"0 10%"}}>
    <Navbar.Brand href="/">FEEDERS </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
       
        <Nav.Link href='/products' >Recipes</Nav.Link>
   
 
       {role ==="admin" ?<Link to="/dashboards"><Button variant="outline-success" >Admin Dashbord</Button> </Link>:null}
      </Nav>
      <Form className="d-flex justify-content-between ">
      <NavDropdown  title={<img
            src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249__340.png"
            className="rounded-circle"
            height="25"
            alt="profile"
            loading="lazy"
          />} id="navbarScrollingDropdown">
          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
        
          <NavDropdown.Divider />
          <NavDropdown.Item >
          <div style={{marginRight:"10px"}}  onClick={()=>dispatch(logout())}>Logout</div>
          </NavDropdown.Item>
        </NavDropdown>   
   
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
   
  )
}

export default UserNav;
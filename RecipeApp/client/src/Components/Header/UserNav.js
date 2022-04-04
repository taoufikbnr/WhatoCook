import React from 'react';
import {Navbar,Container,NavDropdown,Form,FormControl,Button,Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../JS/actions/authActions'

const UserNav = () => {

   const dispatch = useDispatch()
   const role = useSelector((state) => state.authReducer.user.role);
   const isAdmin = useSelector((state) => state.userReducer.isAdmin);

   

 
  return (
    <Navbar style={{background:"rgb(92, 184, 92,0.2)",marginBottom:50}} expand="lg" fixed="top" >
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
   
        <NavDropdown title="Link" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown>
       {/* <Link to="/users"><Button variant="outline-success" >Admin Dashbord</Button> </Link> */}
       {role ==="admin" ?<Link to="/dashboards"><Button variant="outline-success" >Admin Dashbord</Button> </Link>:null}
       {/* {isAdmin ?<Link to="/users"><Button variant="outline-success" >Admin Dashbord</Button> </Link>:null} */}
      </Nav>
      <Form className="d-flex justify-content-between ">
      
   
        <Button style={{marginRight:"10px"}}  onClick={()=>dispatch(logout())} variant="outline-success">Logout</Button>
        <Link to="/profile"><Button variant="outline-success" ><i class="fa fa-user" ></i></Button> </Link>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
   
  )
}

export default UserNav;
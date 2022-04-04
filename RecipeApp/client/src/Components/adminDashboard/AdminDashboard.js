import React, { useEffect } from 'react'
import { Card, CardGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAllProducts } from '../../JS/actions/productActions';
import { getUsers } from '../../JS/actions/userActions';

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.userReducer.users);
    const products = useSelector((state)=> state.productReducer.products)


    useEffect(() => {
        dispatch(getUsers());
        dispatch(getAllProducts())

      }, [dispatch]);
    
  return (
    <>
    <div style={{display:"flex",justifyContent:"space-between",margin:"80px 12%"}}>
    <Link to="/dashboard/users">
  <Card style={{ width: '20rem' }} >
    <Card.Img variant="top"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6a6KfKK66Jy1eCuDau7yp2rb5dIfGvl45g&usqp=CAU"
          alt="profile avatar"/>
         
    <Card.Body>
      <Card.Title>Uses List </Card.Title>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Number of users {users.length}</small>
    </Card.Footer>
  </Card>
  </Link>
  <Link to="/dashboard/products">
  <Card style={{ width: '20rem' }} >
    <Card.Img variant="top"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6a6KfKK66Jy1eCuDau7yp2rb5dIfGvl45g&usqp=CAU"
          alt="profile avatar"/>
         
    <Card.Body>
      <Card.Title>Recipes List </Card.Title>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Number of recipes {products.length}</small>
    </Card.Footer>
  </Card>
  </Link>
  {/* <Card style={{ width: '18rem' }} >
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card> */}
      


</div>

    </>
  )
}

export default AdminDashboard
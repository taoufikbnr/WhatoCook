import React, { useEffect } from 'react'
import { Card, CardGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getAllComments } from '../../JS/actions/commentActions';
import { getAllProducts } from '../../JS/actions/productActions';
import { getUsers } from '../../JS/actions/userActions';
import { Loading } from '../loading/loading';
import './admindashboard.css'
const AdminDashboard = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.userReducer.users);
    const products = useSelector((state)=> state.productReducer.products)
    const comments = useSelector(state=>state.commentReducer.comments)
    const role = useSelector((state) => state.authReducer.user.role);

    const navigate = useNavigate()

    useEffect(() => {
      if(role !== "admin"){
      navigate('/')}


        dispatch(getUsers());
        dispatch(getAllProducts())
        dispatch(getAllComments())

      }, [dispatch,role,navigate]);
    
  return (
    <div className='component-container'>
    <CardGroup className='card-group'> 
    <Link to="/dashboard/users"  className='dashboard-card'>
  <Card >
    <Card.Img style={{height:350}} variant="top"  src="https://www.kindpng.com/picc/m/79-799916_group-of-users-font-awesome-users-icon-hd.png"
          alt="profile avatar"/>
         
    <Card.Body>
      <Card.Title>Users List </Card.Title>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Number of users {users.length}</small>
    </Card.Footer>
  </Card>
  </Link>
  <Link to="/dashboard/products"  className='dashboard-card'>
  <Card   >
    <Card.Img style={{height:350}} variant="top"  src="https://images-na.ssl-images-amazon.com/images/I/71IfGdoNC1L.jpg"
          alt="profile avatar"/>
         
    <Card.Body>
      <Card.Title>Recipes List </Card.Title>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Number of recipes {products.length}</small>
    </Card.Footer>
  </Card>
  </Link>
  
   <Link to="/dashboard/comments"  className='dashboard-card'>
  <Card >
    <Card.Img style={{height:350}} variant="top"  src="https://previews.123rf.com/images/velichkonelli/velichkonelli1810/velichkonelli181000039/110774448-set-template-of-comments-leave-a-comment-on-the-video-reply-to-comment-template-for-feedback-on-the-.jpg"
          alt="profile avatar"/>
         
    <Card.Body>
      <Card.Title>Comments List </Card.Title>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Number of comments {comments.length}</small>
    </Card.Footer>
  </Card>
  </Link>
   

</CardGroup>

    </div>
  )
}

export default AdminDashboard
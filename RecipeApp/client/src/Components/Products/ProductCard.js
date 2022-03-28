import React from 'react'
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../JS/actions/productActions'
import { ProductForm } from '../ProductForm/ProductForm'

const ProductCard = ({product}) => {
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.authReducer.user)
  return (
    <>
  
    <Card style={{ width: '30rem',display:"flex",flexDirection:"row",marginTop:"10px"}}>
  <Card.Img style={{height:150,width:150}} variant="top"
 
   src={product.photo}
    />
  <Card.Body style={{height:150}} >
    <Card.Title>{product.name} </Card.Title>
    <Card.Text>
       {product.ingredient} 
    </Card.Text>

    {product.userId === user._id ?(
    <div>
     <ProductForm
          idProduct={product._id}
              edit={true}
              product={product}
            />
        </div>)
            :null}
  </Card.Body>
 {product.userId === user._id ?(
    
     <Button onClick={()=>dispatch(deleteProduct(product._id))} variant="outline-danger"><i class="fa fa-trash" aria-hidden="true"></i></Button>)
            :null
          }
  


  
</Card>
  

    </>
  )
}

export default ProductCard
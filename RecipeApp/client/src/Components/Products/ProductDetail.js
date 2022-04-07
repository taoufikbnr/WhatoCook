import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../JS/actions/productActions';

const ProductDetail = () => {

    const dispatch = useDispatch();

    const product = useSelector((state) => state.productReducer.products);

    const {productId}= useParams()

    useEffect(() => {
      dispatch(getProductById(productId));
    }, [dispatch]);
  
  return (
    <> 
             <Card style={{marginTop:70,textAlign:'center'}} >
       <h2>How to make {product.name}</h2>
     <Card.Body>
     {/* <Card.Text>{product.ingredient.map(el=><span> With : {el} </span>)} </Card.Text> */}
     {/* With : {product.ingredient.join(' ')}  */}
      <div style={{display:"flex",justifyContent:"center"}} >
         <iframe width={1024} height={405} src="https://www.youtube.com/embed/0sl3eMAXspE" ></iframe>
         </div>
    </Card.Body>
   </Card>
    
   
      
    </>
  )
}

export default ProductDetail
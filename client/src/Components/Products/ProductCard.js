import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../JS/actions/productActions";
import { ProductForm } from "../ProductForm/ProductForm";
import './products.css'
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const role = useSelector((state) => state.authReducer.user.role);

  return (
    <div >
      <Card
       className="product-card "
      >
      <div className="card-container">
           {product.photo.map(el =>
             <Card.Img
             style={{ height: 150, width: 150,display:'flex' }}
             variant="top"
             src={`./images/${el.filename}`}
             />
             
             )}
             <div className="card-body">
             <h4>{product.name} </h4>
            <div style={{display:"flex"}}>

       
             {product.ingredient.map((el, i) => (
            <p>{el},</p>
          
        
          ))} 
          

                    </div> 
                    <Link to={`/product/${product._id}`}> Recipe... </Link>

                    
    </div>
  
    <ButtonGroup style={{position:"absolute",right:0,bottom:0}} aria-label="Basic example">
        {product.userId === user._id ? (
          
              <ProductForm
                idProduct={product._id}
                edit={true}
                product={product}
              />
         
          ) : null}   
         
  {role ==="admin"? <Button
            onClick={() => dispatch(deleteProduct(product._id))}
            variant="outline-warning"
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </Button> :product.userId === user._id ? (
          <Button
            onClick={() => dispatch(deleteProduct(product._id))}
            variant="outline-danger"
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </Button>
        ) : null}
</ButtonGroup>
  </div>

      </Card>
    </div>
  );
};

export default ProductCard;

import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../JS/actions/productActions';
import { addComment } from '../../JS/actions/commentActions';
import CommentCard from '../Comments/CommentCard';

const ProductDetail = () => {
    const [text, settext] = useState("");
    const dispatch = useDispatch();

    const product = useSelector((state) => state.productReducer.products);
    const ingredient = useSelector((state) => state.productReducer.ingredient);
    const user = useSelector((state) => state.authReducer.user);
    const comment = useSelector((state) => state.productReducer.comments);

    const {productId}= useParams()

    useEffect(() => {
      dispatch(getProductById(productId));
    }, [dispatch,productId]);

    const addComments=(e)=>{

      e.preventDefault()
     let newComment={
       text
     }
      dispatch(addComment(productId,newComment))

      settext("");
    }
  
  return (
    <> 
             <Card style={{marginTop:70,textAlign:'center'}} >
       <h2>How to make {product.name}</h2>
     <Card.Body>
     <Card.Text>With : {ingredient.map((el,i)=><span key={i}> {el} </span>)} </Card.Text>
      <div style={{display:"flex",justifyContent:"center"}} >
         <iframe title="recipe video" width={1024} height={405} src="https://www.youtube.com/embed/0sl3eMAXspE" ></iframe>
         </div>
    </Card.Body>
   </Card>
   <div className="container py-4">
   <div className="col-md-10 col-lg-8 m-auto">
      <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
         <div className="d-flex">
            <img className="rounded-circle me-4" alt='user'
               style={{width:50,height:50}}  src="https://via.placeholder.com/128/fe669e/ffcbde.png?text=S" />
            <div className="flex-grow-1">
               <div className="hstack gap-2 mb-1">
                  <a href="/profile" className="fw-bold link-dark">{user.firstname} {user.lastname} </a>
               </div>
               <div className="form-floating mb-3">
                  <textarea className="form-control w-100"
                            placeholder="Leave a comment here"
                      onChange={(e)=>settext(e.target.value)}     required></textarea>
                  <label  >Leave a comment here</label>
               </div>
               <div className="hstack justify-content-end gap-2">
                  <button onClick={(e)=>addComments(e)} className="btn btn-sm btn-primary text-uppercase">comment</button>
               </div>
               <div className="mb-2"> {comment.map((comment,id)=><CommentCard comment={comment} key={id} productId={productId} />)} </div>
            </div>
            
         </div>
      </div>
         </div>
</div>

    
   
      
    </>
  )
}

export default ProductDetail
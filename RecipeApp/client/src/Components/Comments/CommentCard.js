import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../JS/actions/commentActions';

const CommentCard = ({comment,productId}) => {
const dispatch = useDispatch()
    const role = useSelector((state) => state.authReducer.user.role);

  return (
    <>  
        <div class="comments">
    <p>
  {comment.text}   
  
  {role === "admin"? <span onClick={()=>dispatch(deleteComment(comment._id,productId))} style={{position:"absolute",right:0}}><i class="fa fa-trash"></i></span>
:null }

  </p>
    </div>
    </>
  )
}

export default CommentCard
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../JS/actions/commentActions';


const CommentCard = ({comment,productId}) => {
const dispatch = useDispatch()
const users = useSelector((state) => state.userReducer.users);

    const role = useSelector((state) => state.authReducer.user.role);
    users.filter(el=>el._id === comment.userId)

  return (
    <>  
        <div className="comments">
{users && users.filter(el=>el._id === comment.userId).map(  el=><h6>
  
  {el.firstname}</h6>)}
    <p>
  {comment.text}   
  {role === "admin"? <span onClick={()=>dispatch(deleteComment(comment._id,productId))}
  
  style={{position:"absolute",right:0}}><i className="fa fa-trash"></i></span>
:null }

  </p>
    </div>
    </>
  )
}

export default CommentCard
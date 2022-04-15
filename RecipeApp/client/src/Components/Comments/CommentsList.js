import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllComments } from '../../JS/actions/commentActions'
import { getUsers } from '../../JS/actions/userActions'
import './comment.css'
import CommentCard from './CommentCard'
const CommentsList = () => {

  const comment = useSelector(state=>state.commentReducer.comments)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllComments());
    dispatch(getUsers())
  }, [dispatch]);
  return (
    <div style={{marginTop:120}}>
    <h1>Comments List</h1>
    {comment.length === 0 && <h6>There are no comments</h6>}
      {comment && comment.map((comment,i)=>
        <CommentCard comment={comment} key={comment._id} />
        )}
    </div>
  )
}
export default CommentsList
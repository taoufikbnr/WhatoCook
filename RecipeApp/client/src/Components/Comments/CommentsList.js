import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllComments } from '../../JS/actions/commentActions'
import './comment.css'
import CommentCard from './CommentCard'
const CommentsList = () => {


  const comment = useSelector(state=>state.commentReducer.comments)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);
  return (
    <div style={{marginTop:120}}>
      {comment && comment.map(comment=>
      
        
        <CommentCard comment={comment} />
        )}
    </div>
  )
}
export default CommentsList
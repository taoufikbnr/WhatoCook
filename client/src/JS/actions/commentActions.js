import axios from "axios";
import { ADD_COMMENT, ADD_COMMENT_FAILED, ADD_COMMENT_SUCCESS, DELETE_COMMENT, DELETE_COMMENT_SUCCESS, GET_COMMENT, GET_COMMENT_FAILED, GET_COMMENT_SUCCESS } from "../actionstypes/commentTypes";
import { getAuthUser } from "./authActions";
import { getProductById } from "./productActions";

export const getAllComments = () => async (dispatch)=>{
    dispatch({type:GET_COMMENT})

    try {
        const config ={
            headers:{
                authorization:localStorage.getItem('token',)
            }
        }
        const response = await axios.get('/comment/getComments',config)

        dispatch({type:GET_COMMENT_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:GET_COMMENT_FAILED,payload:error.response.data})
    }
}

export const addComment = (productId,newComment) =>async (dispatch)=>{
    dispatch({type:ADD_COMMENT})
    const config ={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        const response = await axios.post(`/comment/addComment/${productId}`,newComment,config)

        dispatch({type:ADD_COMMENT_SUCCESS,payload:response.data})
        dispatch(getProductById(productId))
        dispatch(getAuthUser());



    } catch (error) {
        dispatch({type:ADD_COMMENT_FAILED,payload:error.response.data})
    }
}

export const deleteComment = (commentId,productId) => async (dispatch) =>{

    dispatch({type:DELETE_COMMENT})
    try {
       const config={
            headers:{
                authorization:localStorage.getItem('token')
            }
        }
        const response = await axios.delete(`/comment/${commentId}`,config)

        dispatch({type:DELETE_COMMENT_SUCCESS,payload:response.data})
    dispatch(getProductById(productId))    
    dispatch(getAllComments())
    dispatch(getAuthUser())
    } catch (error) {
        dispatch({type:DELETE_COMMENT,payload:error.response.data})
    }

}
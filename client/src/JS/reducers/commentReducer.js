import { ADD_COMMENT, ADD_COMMENT_FAILED, ADD_COMMENT_SUCCESS, DELETE_COMMENT, DELETE_COMMENT_FAILED, DELETE_COMMENT_SUCCESS, GET_COMMENT, GET_COMMENT_FAILED, GET_COMMENT_SUCCESS } from "../actionstypes/commentTypes";


const initialState = {
    loading:false,
    comments:[],
    errors:[],
    msg:""
}


const  commentReducer = (state=initialState,{type,payload}) =>{
    switch (type) {
        case GET_COMMENT:
        case ADD_COMMENT:
        case DELETE_COMMENT:          
          return {...state,loading:true}
        
          case GET_COMMENT_SUCCESS:
                return {...state,loading:false,comments:payload.comments}

          case ADD_COMMENT_SUCCESS:
          case DELETE_COMMENT_SUCCESS:        
              return {...state,loading:false,msg:payload}

          case GET_COMMENT_FAILED:
          case ADD_COMMENT_FAILED:
          case DELETE_COMMENT_FAILED:        
        
              return {...state,loading:false,errors:payload.errors}    
        default:
            return state ;
    }


}

export default commentReducer;

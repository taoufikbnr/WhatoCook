import { DELETE_USER, DELETE_USER_FAILED, DELETE_USER_SUCCESS, GET_ALL_USERS, GET_ALL_USERS_FAILED, GET_ALL_USERS_SUCCESS, GET_USER_BY_ID, GET_USER_BY_ID_FAILED, GET_USER_BY_ID_SUCCESS } from "../actionstypes/userTypes";


const initialState = {
    loading:false,
    users:[],
    products:[],
    errors: [],
    er:false,
    firstname:""
    
}


const userReducer = (state=initialState,{type,payload})=>{

    switch (type) {
        case GET_USER_BY_ID:
        case GET_ALL_USERS:   
        case DELETE_USER: 
            return {...state,
                loading:true}
           

        case GET_USER_BY_ID_SUCCESS:   
        return {...state,
            loading:false,
            users:payload.users,
            products:payload.users.products}

        case GET_ALL_USERS_SUCCESS:    
            return {...state,
                loading:false,
                users:payload.users,
                er:false
               }  ;  
        case DELETE_USER_SUCCESS:
           return {...state,loading:false,

        msg:payload.msg}      

        case GET_USER_BY_ID_FAILED:
        case GET_ALL_USERS_FAILED:   
        case DELETE_USER_FAILED: 
            return {...state,
                loading: false,
                errors: payload.error,
                er:true,

            };

        default:
            return state;
    }
}
export default userReducer
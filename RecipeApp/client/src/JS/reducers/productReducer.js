import { ADD_PRODUCT, ADD_PRODUCT_FAILED, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT, DELETE_PRODUCT_FAILED, DELETE_PRODUCT_SUCCESS, GET_PRODUCT, GET_PRODUCT_FAILED, GET_PRODUCT_SUCCESS, UPDATE_PRODUCT, UPDATE_PRODUCT_FAILED, UPDATE_PRODUCT_SUCCESS } from "../actionstypes/productTypes";

const initialState = {
    loading: false,
    products: [],
    errors: [],
    er:false
  };


const productReducer = (state=initialState,{type,payload}) => {

    switch (type) {
        case GET_PRODUCT:
        case ADD_PRODUCT:    
        case UPDATE_PRODUCT:
        case DELETE_PRODUCT:
            return {...state,loading:true,er:false}

        case GET_PRODUCT_SUCCESS:
            return {...state,loading:false,products:payload.allProducts,
            msg:payload.msg,er:false} 

        case ADD_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_SUCCESS :   
        case DELETE_PRODUCT_SUCCESS:
            return {...state,loading:false,msg:payload.msg,er:false}
     
        case GET_PRODUCT_FAILED:
        case ADD_PRODUCT_FAILED:  
        case UPDATE_PRODUCT_FAILED:  
        case DELETE_PRODUCT_FAILED:
            return {
                ...state,
                loading: false,
                errors: payload,
                er:true,
              };
             
            
    
        default:
            return state;
    }
}

export default productReducer;

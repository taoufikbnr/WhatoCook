import axios from "axios"
import { ADD_PRODUCT, ADD_PRODUCT_FAILED, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT, DELETE_PRODUCT_FAILED, DELETE_PRODUCT_SUCCESS, GET_PRODUCT, GET_PRODUCT_FAILED, GET_PRODUCT_SUCCESS, UPDATE_PRODUCT, UPDATE_PRODUCT_FAILED, UPDATE_PRODUCT_SUCCESS } from "../actionstypes/productTypes"
import { getAuthUser } from "./authActions"


export const getAllProducts = () =>async (dispatch)=> {

    dispatch({type:GET_PRODUCT})
    try {
        const response =await axios.get("/product/products")
        dispatch({type:GET_PRODUCT_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:GET_PRODUCT_FAILED,payload:error.response.data})
        
    }
}

export const addProduct =(newProduct) =>async (dispatch)=>{
    dispatch({type:ADD_PRODUCT})

        try {
            const config = {
                headers: {
                  authorization: localStorage.getItem("token"),
                },
              };
        const response = await axios.post("/product/addProduct",newProduct,config)

        dispatch({type:ADD_PRODUCT_SUCCESS,payload:response.data})
        dispatch(getAllProducts());
        dispatch(getAuthUser());
        } catch (error) {
        dispatch({type:ADD_PRODUCT_FAILED,payload:error.response.data})   
        }
        
}

export const updateProduct =(idProduct,updateProduct) => async (dispatch) =>{
// idProduct
    dispatch({type:UPDATE_PRODUCT})

    try {
        const config = {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          };
        const response  = await axios.put(`/product/updateProduct/${idProduct}`,updateProduct,config)
        dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:response.data})
        dispatch(getAllProducts());
        dispatch(getAuthUser());

    } catch (error) {
        dispatch({type:UPDATE_PRODUCT_FAILED,payload:error.response.data})
    }

}

export  const deleteProduct=(idProduct) => async (dispatch) =>{



    dispatch({type:DELETE_PRODUCT})
    try {

        const config = {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          };
          const response = await axios.delete(`/product/deleteProduct/${idProduct}`,config)
        dispatch({type:DELETE_PRODUCT_SUCCESS,payload:response.data})

        dispatch(getAllProducts());

    } catch (error) {
        dispatch({type:DELETE_PRODUCT_FAILED,payload:error.response.data})
    }
}
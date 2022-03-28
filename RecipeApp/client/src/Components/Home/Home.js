import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from '../../JS/actions/productActions';
import { ProductForm } from '../ProductForm/ProductForm';
import ProductList from '../Products/ProductList'

const Home = () => {

  return (
    <>
          <ProductList  />   
    
    
</> 
 )
}

export default Home
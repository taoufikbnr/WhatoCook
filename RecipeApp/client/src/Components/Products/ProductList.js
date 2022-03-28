import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../JS/actions/productActions'
import { Loading } from '../loading/loading'
import { ProductForm } from '../ProductForm/ProductForm'
import ProductCard from './ProductCard'


const ProductList = () => {

    const dispatch = useDispatch()

    const products = useSelector((state)=> state.productReducer.products)
    const loading = useSelector((state) => state.productReducer.loading);

    useEffect(() => {
        dispatch(getAllProducts());
      }, [dispatch]);
    

  return loading ? (
      <Loading />):
      (
  <>
<div style={{ position:"fixed",top: "50%",left: "50%"}}>
<ProductForm edit={false} /> 
 
    </div>
    <div style={{margin:"100px 10%",display:"flex",flexWrap:"wrap-reverse" ,justifyContent:'space-between' }}>
    {products.map(product => <ProductCard product={product} key={product._id}  />)}
    </div>
  </>
  )
}

export default ProductList
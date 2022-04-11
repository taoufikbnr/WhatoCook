import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../JS/actions/userActions'
import ProductCard from '../Products/ProductCard'
import Profile from '../profile/Profile'
import ProfileCard from '../profile/ProfileCard'


const UserProfile = () => {
    const user = useSelector((state) => state.userReducer.user);
    const products = useSelector((state) => state.userReducer.products);
    
    const {userId} = useParams()
    const dispatch = useDispatch(userId)
    useEffect(() => {
        dispatch(getUserById(userId))
      
    }, [dispatch,userId])
    
  return (
    <>
    <div style={{marginTop:150}}>
        <ProfileCard user={user} products={products} />
        {/* {products && products.map(product=><ProductCard product={product}  /> )} */}
        </div>
    </>
  )
}

export default UserProfile
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../JS/actions/authActions';
import ProductCard from '../Products/ProductCard';
import ProductList from '../Products/ProductList';
import "./signin.css";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isAuth = useSelector((state) => state.authReducer.isAuth);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
          navigate("/");
        }
      });


    const login = (e) =>  {   
         e.preventDefault()
         dispatch(signIn({email,password}))
         setEmail("")
         setPassword("")
    }
  return (
    <>
    <div style={{display:"flex"}}>
<form class="login">

<fieldset>

  <legend class="legend">Login</legend>

  <div class="input">
    <input onChange={(e)=>setEmail(e.target.value) } type="email" placeholder="Email" required />

  </div>

  <div class="input">
    <input  onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" required />
  </div>

  <button onClick={(e)=>login(e)} type="submit" class="submit"><i class="fa fa-long-arrow-right"></i></button>

</fieldset>



</form>
    </div>
    
    </>
  )
}

export default SignIn
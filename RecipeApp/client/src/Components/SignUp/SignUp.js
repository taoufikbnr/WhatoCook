import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../JS/actions/authActions";
import "../SignIn/signin.css";

const SignUp = () => {
  const [firstname, setFirtname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  });

  const register = (e) => {
    e.preventDefault();

    let newUser = {
      firstname,
      email,
      password,
      lastname
    };

    dispatch(signUp(newUser));

    setFirtname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      
      <form class="login">

<fieldset>

  <legend class="legend">Sign Up</legend>

  <div class="input">
    <input onChange={(e)=>setFirtname(e.target.value) } value={firstname} type="text" placeholder="firtname" required />
  </div>

  <div class="input">
    <input  onChange={(e)=>setLastname(e.target.value)} value={lastname} type="text" placeholder="lastname" required />
  </div>
  <div class="input">
    <input  onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="email" required />
  </div>
  <div class="input">
    <input  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
  </div>

  <button onClick={(e)=>register(e)} type="submit" class="submit"><i class="fa fa-long-arrow-right"></i></button>

</fieldset>


</form>
    </div>
  );
};

export default SignUp;

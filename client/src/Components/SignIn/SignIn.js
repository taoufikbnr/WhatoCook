import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../JS/actions/authActions";
import HandleErrors from "../HandleErrors/HandleErrors";
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const error = useSelector((state) => state.authReducer.errors);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  });

  const login = (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="component-section" >
        <div style={{ display: "flex"}}> 
        <form className="login">
          <fieldset>
            <legend className="legend">Login</legend>

            <div>
              <input
                className="input"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <input
                className="input"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </div>
        {error &&<div className="error">{error.msg} </div>}
        {error.errors && <HandleErrors error={error.errors}/>}
            <button onClick={(e) => login(e)} type="submit" className="submit">
              <i className="fa fa-long-arrow-right"></i>
            </button>
                 </fieldset>
        </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

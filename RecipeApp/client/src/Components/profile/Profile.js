import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../JS/actions/authActions";
import { Loading } from "../loading/loading";
import ProductCard from "../Products/ProductCard";
import "./profile.css"

const Profile = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.authReducer.loading);
  const user = useSelector((state) => state.authReducer.user);
  const products = useSelector((state) => state.authReducer.products);

  useEffect(() => {
    dispatch(getAuthUser())
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : (
    
    <div className="user-profile">
      <section className="user-details" >
        <img
          src="https://thumbs.dreamstime.com/b/icon-profile-color-green-icon-profile-color-green-circle-color-dark-green-background-color-white-194702090.jpg"
          alt=" profile avatar"
        />
        <h2>
          {user.firstname} {user.lastname}
        </h2>
        <p>{user.email}</p> 
         <p>My recipes count : {products.length}</p>
      </section>

      <section className="user-products">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </section>
    </div>
  );
};

export default Profile;

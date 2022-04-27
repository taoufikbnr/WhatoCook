import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../JS/actions/authActions";
import { updatePicture } from "../../JS/actions/userActions";
import HandleErrors from "../HandleErrors/HandleErrors";
import { Loading } from "../loading/loading";
import ProductCard from "../Products/ProductCard";
import "./profile.css"

const Profile = () => {
  const dispatch = useDispatch();
  const [photo, setphoto] = useState("")
  const loading = useSelector((state) => state.authReducer.loading);
  const user = useSelector((state) => state.authReducer.user);
  const picture = useSelector((state) => state.authReducer.picture);
  const products = useSelector((state) => state.authReducer.products);
  const errors = useSelector((state) => state.userReducer.errors);

  useEffect(() => {
    dispatch(getAuthUser())
  }, [dispatch]);
const update =(e)=>{
  e.preventDefault()
  const formData = new FormData();
  
  formData.append('photo',photo);
  dispatch(updatePicture(formData))
}
  return loading ? (
    <Loading />
  ) : (
    <div className="user-profile component-section">
      <section className="user-details" >
        <label > 
            {picture? 
            <div className="profile-picture-frame" >

          <img className="profile-picture"
             variant="top"
             src={`./images/${picture}`}
             >
                </img>
             <i className="fa fa-camera" aria-hidden="true"></i>
                    </div>
            
                :  <div className="profile-picture-frame">
                      <img
          src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png"
          alt=" profile avatar"
        />
        <i className="fa fa-camera" aria-hidden="true"></i>

                </div>

        }

      <input style={{display:'none'}}
              className="input"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={(e) => setphoto(e.target.files[0])}
            /> </label>

    

<div>
<Button
              variant="outline-secondary"
              onClick={(e) => update(e)}> Save </Button>
     
</div>
           
        <h2>
          {user.firstname} {user.lastname}
        </h2>
        <p>{user.email}</p> 
         <p>My recipes count : {products.length}</p>
      </section>
      
      <section className="user-products">
        {products.map((product,i) => (
          <ProductCard product={product} key={i} />
        ))}
      </section>
      {errors && <HandleErrors error={errors} /> }
    </div>
  );
};

export default Profile;

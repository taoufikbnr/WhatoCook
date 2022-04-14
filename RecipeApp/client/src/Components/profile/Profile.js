import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../JS/actions/authActions";
import { updatePicture } from "../../JS/actions/userActions";
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
    
    <div className="user-profile">
      <section className="user-details" >
        <label > 
            {picture? 
            <div style={{position:"relative",width:150,color:"white"}} >

          <img className="profile-picture"
             variant="top"
             src={`./images/${picture}`}
             >
                </img>
             <i style={{position:"absolute",right:25,top:25}} class="fa fa-camera" aria-hidden="true"></i>
                    </div>
            
              
                
                
                :    <img
          src="https://thumbs.dreamstime.com/b/icon-profile-color-green-icon-profile-color-green-circle-color-dark-green-background-color-white-194702090.jpg"
          alt=" profile avatar"
        />}

      <input style={{display:'none'}}
              className="input"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={(e) => setphoto(e.target.files[0])}
            /> </label>

    


             <Button
              variant="outline-secondary"
              onClick={(e) => update(e)}
            >
             Save
            </Button>
     
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
    </div>
  );
};

export default Profile;

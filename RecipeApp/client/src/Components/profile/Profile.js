import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from '../../JS/actions/authActions';
import { Loading } from '../loading/loading';
import ProductCard from '../Products/ProductCard';

const Profile = () => {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.authReducer.loading);
    const user = useSelector((state) => state.authReducer.user);
    const products = useSelector((state) => state.authReducer.products);
    

    useEffect(() => {
        dispatch(getAuthUser());
     
      }, [dispatch]);

  return loading ? (
        <Loading />
      ) : (
        <div className="user-profile" style={{ marginTop: "150px" }}>
          <section className="user-details" style={{ marginTop: "150px" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6a6KfKK66Jy1eCuDau7yp2rb5dIfGvl45g&usqp=CAU"
              alt=" profile avatar"
            />
    
            <h1>
              {user.firstname} {user.firstname}
            </h1>
    
          </section>
    
          <section className="user-products" >
            {products.map((product) => 
         
              <ProductCard product={product} />
            )}
          </section>
        </div>
  )
}

export default Profile
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./Components/adminDashboard/AdminDashboard";
import Footer from "./Components/Footer/Footer";
import GuestNav from "./Components/Header/GuestNav";
import UserNav from "./Components/Header/UserNav";
import Home from "./Components/Home/Home";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ProductDetail from "./Components/Products/ProductDetail";
import ProductList from "./Components/Products/ProductList";
import Profile from "./Components/profile/Profile";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import UsersList from "./Components/UsersList/UsersList";
import CommentsList from "./Components/Comments/CommentsList";

import { getAuthUser } from "./JS/actions/authActions";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const role = useSelector((state) => state.authReducer.user.role);


  useEffect(() => {
    dispatch(getAuthUser());
  }, [isAuth, dispatch]);

  return (
    <> 
      {isAuth ? <UserNav /> : <GuestNav />}
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={ <SignIn />}></Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home  />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <PrivateRoute>
              <ProductDetail  />
          </PrivateRoute>
       
          }
        />

        <Route path="/products" element={<ProductList  />}></Route>
         {role === "admin"?<Route path="/dashboards" 
         element={<PrivateRoute> <AdminDashboard /> </PrivateRoute>} />:<Route path="/" element={<Home/>}/>}
        <Route path="dashboard">
          <Route path="users"  element={<PrivateRoute> <UsersList /> </PrivateRoute>} />
          <Route path="products" element={<PrivateRoute> <ProductList    /> </PrivateRoute>} />
          <Route path="comments" element={<PrivateRoute> <CommentsList    /> </PrivateRoute>} />
        </Route>


      </Routes>
      <Footer />
    </>
  );
}

export default App;

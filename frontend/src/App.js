import {  Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
// import UserNav from "./Components/Header/UserNav";

import NotFound from "./Components/NotFound/NotFound";
import ProductList from "./Components/Products/ProductList";
import GuestNav from "./Components/GuestNav";

function App() {

  return (
    <div className="app"> 
      <GuestNav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

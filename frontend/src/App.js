import {  Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";

import NotFound from "./Components/NotFound/NotFound";
import ProductList from "./Components/Products/ProductList";
import GuestNav from "./Components/GuestNav";
import { useState } from "react";

function App() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="app"> 
      <GuestNav setMobileSidebarOpen={setMobileSidebarOpen} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<ProductList mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

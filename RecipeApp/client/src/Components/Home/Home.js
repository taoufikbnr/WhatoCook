import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import IngredientsCard from "../Ingredients/IngredientsCard";

import ProductList from "../Products/ProductList";
import SearchForm from "../searchForm/SearchForm";

const Home = () => {


  return (
    <div style={{marginTop:150}} >
 
       <ProductList   />
    

       {/* <SearchForm  search={search} setsearch={setsearch} /> */}
      {/* <SearchForm   /> */}
         
       </div>
  );
};

export default Home;

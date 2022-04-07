import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import IngredientsCard from "../Ingredients/IngredientsCard";

import ProductList from "../Products/ProductList";
import Select from "../Select";

const Home = () => {
  // const [search, setsearch] = useState([]);


  return (
    <div >
       {/* <Select search={search} setsearch={setsearch} isFilter={true} /> */}

       {/* <ProductList  search={search}  setsearch={setsearch} isFilter={true} /> */}
       <ProductList  />
    
         
       </div>
  );
};

export default Home;

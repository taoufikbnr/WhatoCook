import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../JS/actions/productActions";
import IngredientsCard from "../Ingredients/IngredientsCard";
import Ingredients from "../Ingredients/IngredientsCard";
import { Loading } from "../loading/loading";
import { ProductForm } from "../ProductForm/ProductForm";
import SearchForm from "../searchForm/SearchForm";
import Select from "../Select";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [search, setsearch] = useState([]);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.productReducer.products);
  const loading = useSelector((state) => state.productReducer.loading);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <>
      {/* <IngredientsCard setsearch={setsearch} /> */}
      {/* <SearchForm search={search} setsearch={setsearch} isFilter={true} /> */}
      <Select search={search} setsearch={setsearch} isFilter={true} />
      {/* <FormControl 
        onChange={(e)=>setsearch(e.target.value)}
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />  */}
      <div style={{ position: "fixed", top: "10%", left: "50%" }}>
        <ProductForm edit={false} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 12%",
        }}
      >
        {/*        
        {<div style={{marginTop:90}}>
        <SearchForm  search={search} setsearch={setsearch} />
        </div> } */}

        {/* <img src='https://mpng.subpng.com/20190409/yqc/kisspng-grape-berries-wine-food-fruit-5cac3c41390387.9656089915547914892335.jpg' style={{width:150,height:150}} 
    onClick={()=>setsearch("grapes")}/>  */}
        <div
          style={{
            margin: "100px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* {products.map((product) => <ProductCard product={product} key={product._id}  />)} */}
          {products
            // .filter((el, i) =>
            //   el.ingredient.find((el) =>
            //     el.toLowerCase().includes(search.toLowerCase())
            //   )
            // )
            .filter((el, i) =>
            el.ingredient.join().toLowerCase().includes(search
              .map((el) => el.value)
             ))
          
              

            //
            //   )
            // )
            .map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;

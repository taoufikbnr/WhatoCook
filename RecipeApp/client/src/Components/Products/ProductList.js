import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../JS/actions/productActions";
import { Loading } from "../loading/loading";
import { ProductForm } from "../ProductForm/ProductForm";
import Select from "../Select";
import ProductCard from "./ProductCard";
import "./products.css"
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
    <div >
      <div style={{ position: "fixed", top: "10%", left: "50%" }}>
        <ProductForm edit={false} />
      </div>
    <div className="product-list-component"> 
    <div className="select">
    <Select search={search} setsearch={setsearch} isFilter={true} />
    </div>
    <div className="product-list">
          {products.filter((el, i) =>
            el.ingredient.join().toLowerCase().includes(search.map((el) => el.value).join()
             )).map((product,i) => (
              <ProductCard product={product} key={i} />
            ))}
        </div>
     </div>   
    </div>  
  );
};

export default ProductList;

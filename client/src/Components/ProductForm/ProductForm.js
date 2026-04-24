import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { addProduct, updateProduct } from "../../JS/actions/productActions";
import Select from "../Select";

export const ProductForm = ({ edit, product, idProduct }) => {

  const isAuth = useSelector(state=>state.authReducer.isAuth)
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const [name, setname] = useState("");
  const [ingredient, setingredient] = useState([]);
  const [photo, setphoto] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(() => {

      if (edit) {
  
        setname(product.name);
        setingredient([]);
        // setingredient([{label: product.ingredient.map(el=>el),value: product.ingredient.map(el=>el) }]);


      } else {
        setname("");
        setingredient([]);
       ;
  
      }
    
    
  }, [edit, product]);

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name',name);

    for (let i = 0; i < ingredient.length; i++) {
      formData.append("ingredient", ingredient[i].value);
    }
    
    formData.append('photo',photo);


    dispatch(addProduct(formData));
    handleClose() 
  };
  const update = (e) => {
    e.preventDefault();


    let updatedProduct = {
      name,
      ingredient:[...ingredient.map(el=>el.value)]
    };

    dispatch(updateProduct(idProduct, updatedProduct));
    handleClose()
  };
  return isAuth ? (
    <div>
      {edit ? (
        <Button onClick={handleShow} variant="outline-secondary" >
          <i className="fa fa-edit"></i>
        </Button>
      ) : (
        <Button variant="outline-success" onClick={handleShow}>
          <i className="fa fa-plus"></i>
        </Button>
      )}
      <div style={{ textAlign: "center"}}>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit" : "Add"} </Modal.Title>
          </Modal.Header>
         


          <form encType="multipart/form-data"> 
          <div>
            <input
              className="input"
              onChange={(e) => setname(e.target.value)}
              value={name}
              type="text"
              placeholder="Recipe name"
              
            />
            <Select ingredient={ingredient} setingredient={setingredient} isFilter={false} />
          </div>
            <input
              className="input"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={(e) => setphoto(e.target.files[0])}
            />
          </form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={(e) => (edit ? update(e) : add(e))}
            >
             {edit ? "Edit" : "Add"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  ):null;
};

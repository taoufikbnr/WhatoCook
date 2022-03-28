import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { addProduct, updateProduct } from "../../JS/actions/productActions";
import Select from "../Select";

export const ProductForm = ({ edit, product, idProduct }) => {
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
      setingredient([...product.ingredient]);
    } else {
      setname("");
      setingredient([]);
    }
  }, [edit, product]);

  const add = (e) => {
    e.preventDefault();
    let newProduct = {
      name,
      ingredient,
      photo,
    };
    dispatch(addProduct(newProduct));
    handleClose();
  };
  const update = (e) => {
    e.preventDefault();
    let updatedProduct = {
      name,
      ingredient,
    };

    dispatch(updateProduct(idProduct, updatedProduct));
    handleClose();
  };
  return (
    <div>
      {edit ? (
        <Button>
          <i onClick={handleShow} className="fa fa-edit"></i>{" "}
        </Button>
      ) : (
        <Button variant="outline-success" onClick={handleShow}>
          <i className="fa fa-plus"></i>
        </Button>
      )}
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit" : "Add"} </Modal.Title>
          </Modal.Header>
          <div>
            <input
              className="input"
              onChange={(e) => setname(e.target.value)}
              value={name}
              type="text"
              placeholder="Recipe name"
              required
            />
          </div>

          <Select ingredient={ingredient} setingredient={setingredient} />

          <div>
            <input
              className="input"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={(e) => setphoto(e.target.files[0])}
            />
          </div>
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
  );
};

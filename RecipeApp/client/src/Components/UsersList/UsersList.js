import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../../JS/actions/userActions";
import { Loading } from "../loading/loading";
import { UsersCard } from "./UsersCard";
import "./userlist.css"
const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.userReducer.users);
  const loading = useSelector((state) => state.userReducer.loading);
  const errors = useSelector((state) => state.userReducer.errors);
  // const isAdmin = useSelector((state) => state.userReducer.isAdmin);
  const er = useSelector((state) => state.userReducer.er);
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div style={{ margin: "115px 10%" }}>
        {er ? (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header
              closeButton
              style={{ background: "rgba(255, 0, 0, 0.4)", height: 150 }}
            >
              <Modal.Title style={{ textAlign: "center" }}>
                {errors.status}:{errors.message}
              </Modal.Title>
            </Modal.Header>
          </Modal>
        ) : null}
<h1>        Users List</h1>        
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Role</th>
      <th className="delete">Delete</th>
    </tr>
  </thead>

</Table>
        {users.map((user,i) => (
       <UsersCard user={user} key={user._id} />
        ))}
    
      </div>
    </>
  );
};

export default UsersList;

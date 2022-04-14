import React, { useEffect, useState } from "react";
import {  Form, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../JS/actions/userActions";
import { Loading } from "../loading/loading";
import { UsersCard } from "./UsersCard";
import "./userlist.css"
import { useNavigate } from "react-router-dom";
import HandleSuccess from "../HandleSuccess/HandleSuccess";
const UsersList = () => {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const loading = useSelector((state) => state.userReducer.loading);
  const errors = useSelector((state) => state.userReducer.errors);
  const er = useSelector((state) => state.userReducer.er);
  const role = useSelector((state) => state.authReducer.user.role);
  const msg = useSelector((state) => state.userReducer.msg);

  const navigate = useNavigate()
  const [searchuser, setsearchuser] = useState("")
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  useEffect(() => {
    if(role !== "admin"){
      navigate('/')
      }

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
<div style={{display:"flex",justifyContent:'space-between'}}>
<h1>        Users List</h1> 
<input className="control" type="text" placeholder="Find User" onChange={(e)=>setsearchuser(e.target.value)}/>

</div>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>User Profile</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Role</th>
      <th className="delete">Delete</th>
    </tr>
  </thead>

</Table>
        {users.filter(el=> el.role.includes(searchuser) || el.email.includes(searchuser) ||
        el.firstname.toLowerCase().includes(searchuser.toLowerCase())).map((user,i) => (
       <UsersCard user={user} key={user._id} />
        ))}
    {msg && <HandleSuccess msg={msg}/>}
      </div>
    </>
  );
};

export default UsersList;

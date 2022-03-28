import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../../JS/actions/userActions";
import { Loading } from "../loading/loading";

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

        {users.map((user) => (
          <div>
            {" "}
            <Button
              variant="outline-danger"
              onClick={() => dispatch(deleteUser(user._id))}
            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </Button>
            TEST {user.firstname} {user.role}
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersList;

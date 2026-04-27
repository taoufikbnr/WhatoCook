import React from "react";
import { Button, Spinner } from "react-bootstrap";

export const Loading = () => {
return (
    <div style={{ position:"fixed",top: "50%",left: "50%"}}>
       <Spinner animation="border" variant="info" size=""/>
 
 
    </div>
)
};
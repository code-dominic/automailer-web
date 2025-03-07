import { useState } from "react";
import Toast from "react-bootstrap/Toast";

function TosterNotefication({message , variant , show , setShow}) {


  return (
    <Toast
      className="d-inline-block m-1"
      bg={variant}
      show={show}
      onClose={() => setShow(false)}
    >
      <Toast.Header>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded me-2"
          alt=""
        />
        <strong className="me-auto">{message}</strong>
      </Toast.Header>
      {/* <Toast.Body>
        
      </Toast.Body> */}
    </Toast>
  );
}

export default TosterNotefication;

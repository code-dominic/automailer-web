import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Login({ setToken }) {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${backendURL}user/login`, { username, password });
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
      console.error(err);
    }
  };

  const onClickRegister = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        backgroundImage: "url('.././public/backgroundImage/BackgroundImage2.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="d-flex justify-content-center">
            <Card
              className="shadow p-4"
              style={{
                width: "100%",
                background: "rgba(255, 255, 255, 0.1)", // Transparent background
                backdropFilter: "blur(10px)", // Frosted glass effect
                borderRadius: "15px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)", // Levitated shadow effect
              }}
            >
              <Card.Body>
                <h2 className="text-center mb-4 text-white">Login</h2>
                <p className="text-center">
                  <span onClick={onClickRegister} className="text-warning" style={{ cursor: "pointer" }}>
                    Register
                  </span>
                </p>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="warning" className="w-100 mb-3" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [appPassword , setAppPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/register", { username, password, email , appPassword });
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  const loginClick = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundImage: "url('.././public/backgroundImage/BackgroundImage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="shadow p-4" style={{ width: "350px", background: "rgba(255, 255, 255, 0.85)" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Register</h2>
            <p className="text-center">
              <span onClick={loginClick} className="text-primary" style={{ cursor: "pointer" }}>
                Login
              </span>
            </p>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>App Password</Form.Label>
                <Form.Control type="password" value={appPassword} onChange={(e) => setAppPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" className="w-100" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
};

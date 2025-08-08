import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Card, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register({ setToken }) {
  const navigate = useNavigate();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      console.log(backendURL);
      const res = await axios.post(`${backendURL}user/register`, { username, password, email, appPassword });
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
                <h2 className="text-center mb-4 text-white">Register</h2>
                <p className="text-center">
                  <span onClick={loginClick} className="text-warning" style={{ cursor: "pointer" }}>
                    Login
                  </span>
                </p>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">App Password</Form.Label>
                    <Form.Control type="password" value={appPassword} onChange={(e) => setAppPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="warning" className="w-100 mb-3" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>

                {/* Accordion for App Password Instructions */}
                <Accordion >
                  <Accordion.Item  eventKey="0" style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)", borderRadius: "10px", color: "white" }}>
                    <Accordion.Header >How to Generate an App Password</Accordion.Header>
                    <Accordion.Body className="text-black">
                      <ol>
                        <li>
                          <strong>Enable 2-Step Verification:</strong>
                          <ul>
                            <li>Go to <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="text-warning">Google Account Security</a>.</li>
                            <li>Under "Signing in to Google", enable 2-Step Verification.</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Generate an App Password:</strong>
                          <ul>
                            <li>Go to <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-warning">App Passwords</a>.</li>
                            <li>Choose "Mail" as the app and "Other" as the device.</li>
                            <li>Click "Generate" and copy the password.</li>
                          </ul>
                        </li>
                      </ol>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
};

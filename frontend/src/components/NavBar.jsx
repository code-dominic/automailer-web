
// const Navbar = () => {
//   return (
//     <nav className="navbar bg-body-tertiary bg-info-subtle">
//   <form className="container-fluid justify-content-start">
//     <button className="btn btn-outline-success me-2" type="button">Main button</button>
//     <button className="btn btn-sm btn-outline-secondary" type="button">Smaller button</button>
//   </form>
// </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const [emails, setEmails] = useState([
    { email: "scooby@gmail.com", status: "Pending", clicked: true },
    { email: "bonny@gmail.com", status: "Sent", clicked: true },
  ]);
  const [template, setTemplate] = useState({
    subject: "Welcome to AutoMailer!",
    body: "Hello [User's Name], We are thrilled to have you on board!",
    buttonLabel: "Get Started",
    buttonLink: "https://example.com",
  });

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-light vh-100 p-3">
          <h5 className="text-primary">AutoMailer</h5>
          <Button variant="outline-primary" className="w-100 mb-2">All Emails</Button>
          <Button variant="outline-secondary" className="w-100 mb-2">Sent Mail</Button>
          <Button variant="outline-warning" className="w-100 mb-2">Pending</Button>
          <Button variant="outline-success" className="w-100 mb-2">Responded</Button>
          <Button variant="outline-danger" className="w-100 mb-2">Unresponded</Button>
        </Col>

        {/* Main Content */}
        <Col md={5} className="p-4">
          <h4>Emails</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Clicked</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((e, index) => (
                <tr key={index}>
                  <td>{e.email}</td>
                  <td>
                    <span
                      className={`badge bg-${e.status === "Sent" ? "success" : "warning"}`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-success">{e.clicked ? "Clicked" : "-"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        {/* Email Template Editor */}
        <Col md={5} className="p-4">
          <h4>Customize Your Email Template</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={template.subject}
                onChange={(e) => setTemplate({ ...template, subject: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={template.body}
                onChange={(e) => setTemplate({ ...template, body: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Button Label</Form.Label>
              <Form.Control
                type="text"
                value={template.buttonLabel}
                onChange={(e) => setTemplate({ ...template, buttonLabel: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Button Link</Form.Label>
              <Form.Control
                type="text"
                value={template.buttonLink}
                onChange={(e) => setTemplate({ ...template, buttonLink: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" className="w-100">Send Email</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
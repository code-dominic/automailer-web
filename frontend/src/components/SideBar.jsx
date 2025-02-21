import { useState } from "react";
import { Navbar, Button, Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  const [show, setShow] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar - Always visible on large screens */}
      <div className="d-none d-lg-block bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
        <h4>Sidebar</h4>
        <div className="d-flex flex-column gap-2">
          <Button variant="outline-light">Home</Button>
          <Button variant="outline-light">About</Button>
          <Button variant="outline-light">Services</Button>
          <Button variant="outline-light">Contact</Button>
        </div>
      </div>

      {/* Offcanvas Sidebar - For small screens */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column gap-2">
            <Button variant="dark">Home</Button>
            <Button variant="dark">About</Button>
            <Button variant="dark">Services</Button>
            <Button variant="dark">Contact</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Navbar - Only visible on small screens */}
        <Navbar bg="dark" variant="dark" className="d-lg-none">
          <Button variant="outline-light" onClick={() => setShow(true)}>
            ☰
          </Button>
          <Navbar.Brand className="ms-3">My Website</Navbar.Brand>
        </Navbar>

        <div className="p-4">
          <h2>Welcome!</h2>
          <p>Here's your main content.</p>
        </div>
      </div>
    </div>
  );
}

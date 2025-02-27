// SidebarNavigation.js
import React, { useState } from "react";
import { Navbar, Button, Offcanvas, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SidePanelItems from "../SidePanalItem/SidePanelItems";
import FileUpload from "../FileUploade/FileUpload";
import Logout from "../logout/Logout";

const SidebarNavigation = ({ token, setToken, emailsRequired, setEmailsRequired }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Navbar for Small Screens - Placed at the Top */}
      <Navbar bg="dark" variant="dark" fixed="top" className="d-lg-none">
        <Container>
          <Button variant="outline-light" onClick={() => setShow(true)}>☰</Button>
          <Navbar.Brand className="ms-3 ms-auto">Profile</Navbar.Brand>
        </Container>
      </Navbar>

      {/* Sidebar for Large Screens */}
      <div className="d-none d-lg-block bg-dark text-white vh-100 p-3" style={{ width: "250px", marginTop: "56px" }}>
        <h4>Profile</h4>
        <div className="d-flex flex-column gap-2">
          {["All emails", "Sent mail", "Pending", "Responded", "Unresponded"].map((name) => (
            <SidePanelItems
              key={name}
              name={name}
              emailsRequired={emailsRequired}
              setEmailsRequired={setEmailsRequired}
              variant="outline-light"
            />
          ))}
          <FileUpload token={token} />
          {token && <Logout token={token} setToken={setToken} />}
        </div>
      </div>

      {/* Offcanvas Sidebar for Small Screens */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column gap-2">
            {["All emails", "Sent mail", "Pending", "Responded", "Unresponded"].map((name) => (
              <SidePanelItems
                key={name}
                name={name}
                emailsRequired={emailsRequired}
                setEmailsRequired={setEmailsRequired}
                variant="dark"
              />
            ))}
            <FileUpload token={token} />
            {token && <Logout token={token} setToken={setToken} />}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SidebarNavigation;
import { Navbar, Button, Container ,Modal } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa"; // Import user icon from react-icons
import { useState } from "react";

const NavBar = ({ setShow, username }) => {
  const [showProfileModal , setShowProfileModal] = useState(false);

  return (
    <>
    <Navbar bg="dark" variant="dark" style={{ width: "100%", zIndex: 1030 }}>
      <Container className="d-flex justify-content-between align-items-center">
        {/* Left side: Hamburger & AutoMailer */}
        <div className="d-flex align-items-center">
          {/* Hamburger Button (Visible only on small screens) */}
          <Button variant="outline-light d-lg-none me-2" onClick={() => setShow(true)}>
            ☰
          </Button>
          <Navbar.Brand className="d-none d-lg-block">AutoMailer</Navbar.Brand>
          <span className="vertical-line d-none d-lg-block"></span>
        </div>

        {/* Right side: Profile Section */}
        <div className="profile-section ms-auto" onClick={()=> setShowProfileModal(true)}>
          <FaUserCircle className="profile-icon" />
          <span className="username">@{username}</span>
        </div>
      </Container>
    </Navbar>

     <Modal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Username: @{username}</p>
          <p>Email: example@email.com</p>
          <p>Additional profile info can go here.</p>
        </Modal.Body>
      </Modal>

      </>
  );
};

export default NavBar;

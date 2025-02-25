import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Navbar, Button, Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmailList from "./EmailList";
import EmailTemplateEditor from "./EmailTemplateEditor";
import SidePanelItems from "./SidePanelItems";
import FileUpload from "./FileUpload";
import Logout from "./Logout/Logout";

const MainContainer = ({token , setToken}) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emailsRequired, setEmailsRequired] = useState("All emails");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/emails?emails=${emailsRequired}` , {
          headers: {
            "authorization" : token
            
        },
      });
        setEmails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching emails:", error);
        setError("Failed to fetch emails.");
        setLoading(false);
      }
    };
    fetchEmails();
  }, [emailsRequired]);

  if (loading) return <p>Loading emails...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="d-flex">
        {/* Sidebar */}
        <div className="d-none d-lg-block bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
          <h4>Profile</h4>
          <div className="d-flex flex-column gap-2">
            <SidePanelItems name="All emails" emailsRequired={emailsRequired} setEmailsRequired={setEmailsRequired} variant="outline-light" />
            <SidePanelItems name="Sent mail" emailsRequired={emailsRequired} setEmailsRequired={setEmailsRequired} variant="outline-light" />
            <SidePanelItems name="Pending" emailsRequired={emailsRequired} setEmailsRequired={setEmailsRequired} variant="outline-light" />
            <SidePanelItems name="Responded" emailsRequired={emailsRequired} setEmailsRequired={setEmailsRequired} variant="outline-light" />
            <SidePanelItems name="Unresponded" emailsRequired={emailsRequired} setEmailsRequired={setEmailsRequired} variant="outline-light" />
            <FileUpload token = {token }/>
            { token ?<Logout token ={token} setToken={setToken}/>:<></>} 


          </div>
        </div>

        {/* Offcanvas Sidebar for Small Screens */}
        <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex flex-column gap-2">
              <SidePanelItems name="All emails" emailsRequired={emailsRequired} setEmailsRequired={setEmailsRequired} variant="dark" />
              <SidePanelItems name="Sent mail" emailsRequired={emailsRequired} setEmailsRequired={setEmailsRequired} variant="dark" />
              <SidePanelItems name="Pending" emailsRequired={emailsRequired} setEmailsRequired={setEmailsRequired} variant="dark" />
              <SidePanelItems name="Responded" emailsRequired={emailsRequired} setEmailsRequired={setEmailsRequired} variant="dark" />
              <SidePanelItems name="Unresponded" emailsRequired={emailsRequired} setEmailsRequired={setEmailsRequired} variant="dark" />
              <FileUpload token = {token} />
            { token ?<Logout token ={token} setToken={setToken}/>:<></>} 
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}
        <div className="flex-grow-1">
          {/* Navbar for Small Screens */}
          <Navbar bg="dark" variant="dark" className="d-lg-none">
            <Button variant="outline-light" onClick={() => setShow(true)}>☰</Button>
            <Navbar.Brand className="ms-3 ms-auto">Profile</Navbar.Brand>
          </Navbar>

          <div className="p-4">
            <Container fluid>
              <Row className="gx-0">
                {/* Main Content */}
                <Col xs={12} md={5} className="p-4 flex-grow-1">
                  <h4>{emailsRequired}</h4>
                  {loading ? <p>Loading emails...</p> : <EmailList emails={emails} setEmails={setEmails} heading={emailsRequired} />}
                </Col>

                {/* Email Template Editor */}
                <Col xs={12} md={5}>
                  <EmailTemplateEditor token = {token} />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContainer;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmailList from "../EmailList/EmailList";
import EmailTemplateEditor from "../EmailTemplateEditor/EmailTemplateEditor";
import SidebarNavigation from "../SidebarNavigation/SidebarNavigation";

const DashBoard = ({token , setToken}) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emailsRequired, setEmailsRequired] = useState("All emails");

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
          if (error.response && error.response.status === 401) {
            console.warn("Token expired! Logging out...");
            localStorage.removeItem("token"); // Remove expired token
            window.location.href = "/login"; // Redirect to login page
            setError("Failed to fetch emails.");
            setLoading(true);
          } else {
            console.error("Error fetching emails:", error);
          }
      }
    };
    fetchEmails();
  }, [emailsRequired]);

  if (loading) return <p>Loading emails...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="d-flex">
      <SidebarNavigation 
        token={token} 
        setToken={setToken} 
        emailsRequired={emailsRequired} 
        setEmailsRequired={setEmailsRequired} 
      />
      <div className="flex-grow-1">
        <div className="p-4">
          <Container fluid>
            <Row className="gx-0">
              <Col xs={12} md={5} className="p-4 flex-grow-1">
                <h4>{emailsRequired}</h4>
                {loading ? <p>Loading emails...</p> : <EmailList emails={emails} setEmails={setEmails} heading={emailsRequired} token={token} />}
              </Col>
              <Col xs={12} md={5}>
                <EmailTemplateEditor token={token} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );  
};

export default DashBoard;

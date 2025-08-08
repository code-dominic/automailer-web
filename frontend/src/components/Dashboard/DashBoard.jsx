import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmailList from "../EmailList/EmailList";
import EmailTemplateEditor from "../EmailTemplateEditor/EmailTemplateEditor";
import SidebarNavigation from "../SidebarNavigation/SidebarNavigation";
import NavBar from "./NavBar";

const DashBoard = ({token , setToken}) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emailsRequired, setEmailsRequired] = useState("All emails");
  const [needRefresh , setNeedRefresh] = useState(1);
  const [show , setShow] = useState(false);
  const [username , setUsername] = useState("");
  const [defaultEmailTemp , setDefaultEmailTemp] =useState();

  useEffect(() => {
    console.log("Fetching emails..."); 
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`${backendURL}emails?emails=All emails` , {
          headers: {
            "authorization" : token
        },
      });
      console.log(response)
        setEmails(response.data.emails);
        setUsername(response.data.username)
        setDefaultEmailTemp(response.data.defaultEmailTemp);
        
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
  }, [needRefresh]);



  if (loading) return <p>Loading emails...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <NavBar setShow={setShow} username={username}/>
    <div className="d-flex"  style={{
      minHeight : "100vh"
    }}>
      <SidebarNavigation 
        token={token} 
        setToken={setToken} 
        emailsRequired={emailsRequired} 
        setEmailsRequired={setEmailsRequired} 
        needRefresh = {needRefresh}
        setNeedRefresh = {setNeedRefresh}
        show= {show}
        setShow={setShow}
      />
      <div className="flex-grow-1">
        <div >
          <Container fluid>
            <Row className="gx-0">
              <Col xs={12} lg={5} className="flex-grow-1">
                <h4 style={{textAlign : "center"}}>{emailsRequired}</h4>
                {loading ? <p>Loading emails...</p> : <EmailList emails={emails} setEmails={setEmails} emailsRequired={emailsRequired} token={token} needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}/>}
              </Col>
              <Col xs={12} lg={5}>
                <EmailTemplateEditor token={token} defaultEmailTemp={defaultEmailTemp} needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}/>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
    </>
  );  
};

export default DashBoard;

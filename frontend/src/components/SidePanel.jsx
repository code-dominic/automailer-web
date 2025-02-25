// import { Padding } from "@mui/icons-material";
import SidePanelItems from "./SidePanelItems";
// import {  Col, Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
// import { Menu, X } from "lucide-react";
import Logout from "./Logout/Logout";



function SidePanel(props) {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
          <h5 className="text-primary">AutoMailer</h5>
          <SidePanelItems name={"All emails"} emailsRequired={props.emailsRequired} setEmailsRequired={props.setEmailsRequired} variant={"outline-primary"}/>

          <SidePanelItems name={"Sent mail"} emailsRequired={props.emailsRequired}  setEmailsRequired={props.setEmailsRequired} variant={"outline-secondary"} />

            <SidePanelItems name={"Pending"} emailsRequired={props.emailsRequired} setEmailsRequired={props.setEmailsRequired} variant={"outline-warning"} />

                <SidePanelItems name={"Responded"} emailsRequired={props.emailsRequired}  setEmailsRequired={props.setEmailsRequired} variant={"outline-success"} />

                <SidePanelItems name={"Unresponded"} emailsRequired={props.emailsRequired}  setEmailsRequired={props.setEmailsRequired} variant={"outline-danger"} />

                if(props.token) <Logout/>
        </>


);



}

export default SidePanel;
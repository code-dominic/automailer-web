// import { Padding } from "@mui/icons-material";
import SidePanelItems from "./SidePanelItems";
// import {  Col, Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Menu, X } from "lucide-react";


function SidePanel(props) {
    const [isOpen, setIsOpen] = useState(false);


    return (
        // <div className="card" style={{
        //     width: " 100%",
        //     margin : "0px",
        //     height : "100vh"
        //     }}>
        //     <ul className="list-group list-group-flush" style={{Padding : "1rem"}}>

        //         <SidePanelItems name={"All emails"} emailsRequired={props.emailsRequired} setEmailsRequired={props.setEmailsRequired}/>

                // <SidePanelItems name={"Sent mail"} emailsRequired={props.emailsRequired}  setEmailsRequired={props.setEmailsRequired} />

                // <SidePanelItems name={"Pending"} emailsRequired={props.emailsRequired} setEmailsRequired={props.setEmailsRequired} />

                // <SidePanelItems name={"Responded"} emailsRequired={props.emailsRequired}  setEmailsRequired={props.setEmailsRequired} />

                // <SidePanelItems name={"Unresponded"} emailsRequired={props.emailsRequired}  setEmailsRequired={props.setEmailsRequired} />

        //         {/* <li className="list-group-item">All emails</li>
        //         <li className="list-group-item">Sent mail</li>
        //         <li className="list-group-item">Pending</li>
        //         <li className="list-group-item">Responded</li>
        //         <li className="list-group-item">Unresponded</li> */}
        //     </ul>
        // </div>
        <>
          <h5 className="text-primary">AutoMailer</h5>
          {/* <Button variant="outline-primary" className="w-100 mb-2">All Emails</Button>
          <Button variant="outline-secondary" className="w-100 mb-2">Sent Mail</Button>
          <Button variant="outline-warning" className="w-100 mb-2">Pending</Button>
          <Button variant="outline-success" className="w-100 mb-2">Responded</Button>
          <Button variant="outline-danger" className="w-100 mb-2">Unresponded</Button> */}
          <SidePanelItems name={"All emails"} emailsRequired={props.emailsRequired} setEmailsRequired={props.setEmailsRequired} variant={"outline-primary"}/>

          <SidePanelItems name={"Sent mail"} emailsRequired={props.emailsRequired}  setEmailsRequired={props.setEmailsRequired} variant={"outline-secondary"} />

            <SidePanelItems name={"Pending"} emailsRequired={props.emailsRequired} setEmailsRequired={props.setEmailsRequired} variant={"outline-warning"} />

                <SidePanelItems name={"Responded"} emailsRequired={props.emailsRequired}  setEmailsRequired={props.setEmailsRequired} variant={"outline-success"} />

                <SidePanelItems name={"Unresponded"} emailsRequired={props.emailsRequired}  setEmailsRequired={props.setEmailsRequired} variant={"outline-danger"} />
        </>


);



}

export default SidePanel;
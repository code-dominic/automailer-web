import {Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";




const EmailSentTable = ({emailsent , setCurrEmail}) => {
    const handelClick = (key) => {
        const selectedEmail = emailsent[key]?.emailsendRef;
        if (selectedEmail) {
            setCurrEmail(selectedEmail);
            console.log("Updated Email:", selectedEmail);
        } else {
            console.warn("Invalid email selection:", emailsent[key]);
        }
    };
    


  return (
    
    // <h4>Emails</h4>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Status</th>
          <th>Clicked</th>
        </tr>
      </thead>
      <tbody>
        {emailsent.map((e, index) => (
          <tr key={index} onClick={() => handelClick(index)}>
            <td>{e.emailsendRef.subject}</td>
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
  );
};

export default EmailSentTable;

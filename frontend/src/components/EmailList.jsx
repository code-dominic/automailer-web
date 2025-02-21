
import ListItems from "./ListItems";
import FileUpload from "./FileUpload";
import {Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const EmailList = (props) => {

  return (
    
    // <h4>Emails</h4>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Clicked</th>
        </tr>
      </thead>
      <tbody>
        {props.emails.map((e, index) => (
          <tr key={index}>
            <td>{e.name}</td>
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

export default EmailList;

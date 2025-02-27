import { useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonDataDashboard from "../personDataDashboard/PersonDataDashboard";

const EmailList = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (email) => {
    setSelectedId(email._id);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
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
            <tr key={index} onClick={() => handleClick(e)}>
              <td>{e.name}</td>
              <td>
                <span className={`badge bg-${e.status === "Sent" ? "success" : "warning"}`}>
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

      {/* Modal with PersonDataDashboard */}
      <PersonDataDashboard show={showModal} handleClose={handleClose} _id={selectedId} />
    </>
  );
};

export default EmailList;

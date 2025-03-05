import { useState } from "react";
import { Table, Pagination, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonDataDashboard from "../personDataDashboard/PersonDataDashboard";
import SearchBar from "../SeachBar/Search";

const EmailList = ({ emails }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 15;

  const handleClick = (email) => {
    setSelectedId(email._id);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // **Filter emails based on search query**
  const filteredEmails = emails.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  // **Pagination Logic**
  const totalPages = Math.ceil(filteredEmails.length / emailsPerPage);
  const startIndex = (currentPage - 1) * emailsPerPage;
  const displayedEmails = filteredEmails.slice(startIndex, startIndex + emailsPerPage);

  // Reset to first page if search changes
  useState(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="d-flex justify-content-between align-items-center">
              Name <span className="d-inline-flex">
                <SearchBar query={query} setQuery={setQuery} />
              </span>
            </th>


            {/* <th>Status</th>
            <th>Clicked</th> */}
          </tr>
        </thead>
        <tbody>
          {displayedEmails.length > 0 ? (
            displayedEmails.map((e, index) => (
              <tr key={index} onClick={() => handleClick(e)}>
                <td>{e.name}</td>
                {/* <td>
                  <span className={`badge bg-${e.status === "Sent" ? "success" : "warning"}`}>
                    {e.status}
                  </span>
                </td>
                <td>
                  <span className="badge bg-success">{e.clicked ? "Clicked" : "-"}</span>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}

      {/* Modal with PersonDataDashboard */}
      <PersonDataDashboard show={showModal} handleClose={handleClose} _id={selectedId} />
    </Container>
  );
};

export default EmailList;

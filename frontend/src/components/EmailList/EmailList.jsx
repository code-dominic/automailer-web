import { useEffect, useState } from "react";
import { Table, Pagination, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonDataDashboard from "../personDataDashboard/PersonDataDashboard";
import SearchBar from "../SeachBar/Search";

const EmailList = ({ emails, emailsRequired , setNeedRefresh,needRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 15;
  const [displayEmail, setDisplayEmail] = useState(emails);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleClick = (email) => {
    setSelectedId(email._id);
    setShowModal(true);
  };

  useEffect(() => {
    if (emailsRequired === "All emails") {
      setDisplayEmail(emails);
    } else if (emailsRequired === "Pending") {
      setDisplayEmail(emails.filter((email) => email.emailSend.length === 0));
    } else if (emailsRequired === "Sent email") {
      setDisplayEmail(emails.filter((email) => email.emailSend.length > 0));
    } else if (emailsRequired === "Responded") {
      setDisplayEmail(
        emails.filter(
          (email) => email.emailSend[email.emailSend.length - 1]?.clicked === true
        )
      );
    } else if (emailsRequired === "Unresponded") {
      setDisplayEmail(
        emails.filter(
          (email) => email.emailSend[email.emailSend.length - 1]?.clicked === false
        )
      );
    }
  }, [emailsRequired , emails]);

  const handleClose = () => setShowModal(false);

  // Sorting Function
  const sortEmails = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    setDisplayEmail((prevEmails) =>
      [...prevEmails].sort((a, b) => {
        let aValue, bValue;
        if (key === "name") {
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
        } else if (key === "emailsSent") {
          aValue = a.emailSend.length;
          bValue = b.emailSend.length;
        } else if (key === "responded") {
          aValue = a.emailSend.filter((mail) => mail.clicked === true).length;
          bValue = b.emailSend.filter((mail) => mail.clicked === true).length;
        }

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  // **Filter emails based on search query**
  const filteredEmails = displayEmail.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  // **Pagination Logic**
  const totalPages = Math.ceil(filteredEmails.length / emailsPerPage);
  const startIndex = (currentPage - 1) * emailsPerPage;
  const displayedEmails = filteredEmails.slice(startIndex, startIndex + emailsPerPage);

  return (
    <Container>
      <Table striped bordered hover>
  <thead>
    <tr>
      <th className="d-flex justify-content-between align-items-center">
        Name 
        <Button variant="light" size="sm" onClick={() => sortEmails("name")}>
          {sortConfig.key === "name" && sortConfig.direction === "asc" ? "🔼" : "🔽"}
        </Button>
        <SearchBar query={query} setQuery={setQuery} />
      </th>
      <th className="d-none d-md-table-cell">
        Emails Sent
        <Button variant="light" size="sm" onClick={() => sortEmails("emailsSent")}>
          {sortConfig.key === "emailsSent" && sortConfig.direction === "asc" ? "🔼" : "🔽"}
        </Button>
      </th>
      <th className="d-none d-md-table-cell">
        Responded
        <Button variant="light" size="sm" onClick={() => sortEmails("responded")}>
          {sortConfig.key === "responded" && sortConfig.direction === "asc" ? "🔼" : "🔽"}
        </Button>
      </th>
    </tr>
  </thead>
  <tbody>
    {displayedEmails.length > 0 ? (
      displayedEmails.map((e, index) => (
        <tr key={index} onClick={() => handleClick(e)}>
          <td>{e.name}</td>
          <td className="d-none d-md-table-cell">{e.emailSend.length}</td>
          <td className="d-none d-md-table-cell">
            {e.emailSend.filter((mail) => mail.clicked === true).length}
          </td>
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
      <PersonDataDashboard show={showModal} handleClose={handleClose} _id={selectedId} needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}/>
    </Container>
  );
};

export default EmailList;

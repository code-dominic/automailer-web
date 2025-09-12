



import React, { useEffect, useState } from "react";
 import PersonDataDashboard from "../PersonDataDashboard/PersonDataDashboard";
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Users, 
  Send,
  Trash2,
  Download,
  Filter,
  MoreVertical,
  Eye,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Mock components - replace with your actual imports


const SearchBar = ({ query, setQuery }) => (
  <div className="position-relative">
    <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
    <input
      type="text"
      className="form-control ps-5 search-input"
      placeholder="Search contacts..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </div>
);

const EmailList = ({ 
  emails = [], 
  emailsRequired = "All emails", 
  setNeedRefresh,
  needRefresh,
  selectedRows,
  setSelectedRows,
  selectAll,
  setSelectAll
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedRows, setSelectedRows] = useState(new Set());
  // const [selectAll, setSelectAll] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const emailsPerPage = 15;
  const [displayEmail, setDisplayEmail] = useState(emails);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleClick = (email, e) => {
    // Prevent modal from opening when clicking checkbox
    if (e.target.type === 'checkbox') return;
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
  }, [emailsRequired, emails]);

  const handleClose = () => setShowModal(false);

  // Row selection handlers
  const handleRowSelect = (emailId) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(emailId)) {
      newSelected.delete(emailId);
    } else {
      newSelected.add(emailId);
    }
    setSelectedRows(newSelected);
    setShowBulkActions(newSelected.size > 0);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setShowBulkActions(false);
    } else {
      const allIds = new Set(filteredEmails.map(email => email._id));
      setSelectedRows(allIds);
      setShowBulkActions(true);
    }
    setSelectAll(!selectAll);
  };

  // Bulk actions
  const handleBulkDelete = () => {
    console.log("Bulk delete:", Array.from(selectedRows));
    setSelectedRows(new Set());
    setSelectAll(false);
    setShowBulkActions(false);
  };

  const handleBulkEmail = () => {
    console.log("Bulk email:", Array.from(selectedRows));
  };

  const handleBulkExport = () => {
    console.log("Bulk export:", Array.from(selectedRows));
  };

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

  // Filter emails based on search query
  const filteredEmails = displayEmail.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredEmails.length / emailsPerPage);
  const startIndex = (currentPage - 1) * emailsPerPage;
  const displayedEmails = filteredEmails.slice(startIndex, startIndex + emailsPerPage);

  const getStatusBadge = (email) => {
    if (email.emailSend.length === 0) {
      return (
        <span className="badge bg-secondary status-badge">
          <Clock size={12} className="me-1" />Pending
        </span>
      );
    }
    const lastEmail = email.emailSend[email.emailSend.length - 1];
    if (lastEmail?.clicked === true) {
      return (
        <span className="badge bg-success status-badge">
          <CheckCircle size={12} className="me-1" />Responded
        </span>
      );
    }
    return (
      <span className="badge bg-warning status-badge">
        <XCircle size={12} className="me-1" />Sent
      </span>
    );
  };

  return (
    <div className="container-fluid px-4">
      {/* Header Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <Users className="me-2 text-primary" size={24} />
                <div>
                  <h4 className="mb-0 fw-bold">Email Contacts</h4>
                  <small className="text-muted">
                    {filteredEmails.length} {emailsRequired.toLowerCase()}
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row g-2">
                <div className="col-sm-8">
                  <SearchBar query={query} setQuery={setQuery} />
                </div>
                <div className="col-sm-4">
                  <div className="dropdown">
                    <button 
                      className="btn btn-outline-primary w-100"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <Filter size={16} className="me-2" />
                      Filter
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">All Emails</a></li>
                      <li><a className="dropdown-item" href="#">Pending</a></li>
                      <li><a className="dropdown-item" href="#">Sent</a></li>
                      <li><a className="dropdown-item" href="#">Responded</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {showBulkActions && (
        <div className="alert alert-primary d-flex align-items-center justify-content-between">
          <div>
            <strong>{selectedRows.size}</strong> item{selectedRows.size !== 1 ? 's' : ''} selected
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={handleBulkEmail}>
              <Send size={16} className="me-1" />
              Send Email
            </button>
            <button className="btn btn-outline-success btn-sm" onClick={handleBulkExport}>
              <Download size={16} className="me-1" />
              Export
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={handleBulkDelete}>
              <Trash2 size={16} className="me-1" />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Main Table Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover modern-table mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '50px' }}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="fw-semibold">Name</span>
                      <button
                        className="btn sort-btn"
                        onClick={() => sortEmails("name")}
                      >
                        {sortConfig.key === "name" && sortConfig.direction === "asc" ? 
                          <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </th>
                  <th className="d-none d-md-table-cell">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="fw-semibold">Emails Sent</span>
                      <button
                        className="btn sort-btn"
                        onClick={() => sortEmails("emailsSent")}
                      >
                        {sortConfig.key === "emailsSent" && sortConfig.direction === "asc" ? 
                          <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </th>
                  <th className="d-none d-md-table-cell">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="fw-semibold">Responded</span>
                      <button
                        className="btn sort-btn"
                        onClick={() => sortEmails("responded")}
                      >
                        {sortConfig.key === "responded" && sortConfig.direction === "asc" ? 
                          <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </th>
                  <th className="d-none d-lg-table-cell">Status</th>
                  <th style={{ width: '60px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedEmails.length > 0 ? (
                  displayedEmails.map((e, index) => (
                    <tr 
                      key={e._id || index} 
                      className={`table-row ${selectedRows.has(e._id) ? 'selected-row' : ''}`}
                      onClick={(event) => handleClick(e, event)}
                    >
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedRows.has(e._id)}
                            onChange={() => handleRowSelect(e._id)}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="user-avatar me-3">
                            {e.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-medium">{e.name}</div>
                            <small className="text-muted">{e.email}</small>
                          </div>
                        </div>
                      </td>
                      <td className="d-none d-md-table-cell">
                        <div className="d-flex align-items-center">
                          <Mail size={16} className="me-2 text-primary" />
                          <span className="fw-medium">{e.emailSend.length}</span>
                        </div>
                      </td>
                      <td className="d-none d-md-table-cell">
                        <div className="d-flex align-items-center">
                          <CheckCircle size={16} className="me-2 text-success" />
                          <span className="fw-medium">
                            {e.emailSend.filter((mail) => mail.clicked === true).length}
                          </span>
                        </div>
                      </td>
                      <td className="d-none d-lg-table-cell">
                        {getStatusBadge(e)}
                      </td>
                      <td>
                        <div className="dropdown">
                          <button 
                            className="btn action-btn"
                            type="button"
                            data-bs-toggle="dropdown"
                          >
                            <MoreVertical size={16} />
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                <Eye size={14} className="me-2" />
                                View Details
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                <Send size={14} className="me-2" />
                                Send Email
                              </a>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                              <a className="dropdown-item text-danger" href="#">
                                <Trash2 size={14} className="me-2" />
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="text-muted">
                        <Users size={48} className="mb-3 opacity-50" />
                        <p className="mb-0">No contacts found</p>
                        <small>Try adjusting your search or filters</small>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center p-3 border-top">
              <small className="text-muted">
                Showing {startIndex + 1} to {Math.min(startIndex + emailsPerPage, filteredEmails.length)} of {filteredEmails.length} results
              </small>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={14} />
                    </button>
                  </li>
                  {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = index + 1;
                    } else if (currentPage <= 3) {
                      pageNum = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + index;
                    } else {
                      pageNum = currentPage - 2 + index;
                    }
                    
                    return (
                      <li key={pageNum} className={`page-item ${pageNum === currentPage ? 'active' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      </li>
                    );
                  })}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={14} />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <PersonDataDashboard 
        show={showModal} 
        handleClose={handleClose} 
        _id={selectedId} 
        needRefresh={needRefresh} 
        setNeedRefresh={setNeedRefresh}
      />

      {/* Bootstrap CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />

      {/* Bootstrap JS */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>

      {/* Custom Styles */}
      <style jsx>{`
        .search-input {
          border: 1px solid #e0e6ed;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .search-input:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.1);
        }

        .modern-table {
          border: none;
        }
        
        .modern-table th {
          border: none;
          padding: 1rem;
          font-weight: 600;
          color: #495057;
          background-color: #f8f9fa !important;
        }
        
        .modern-table td {
          border: none;
          padding: 1rem;
          vertical-align: middle;
          border-bottom: 1px solid #f1f3f4;
        }
        
        .table-row {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .table-row:hover {
          background-color: #f8f9fa;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .selected-row {
          background-color: #e7f3ff !important;
          border-left: 3px solid #0d6efd;
        }
        
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(45deg, #0d6efd, #6c5ce7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }
        
        .status-badge {
          font-size: 0.75rem;
          padding: 0.5rem 0.75rem;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
        }
        
        .sort-btn {
          background: none;
          border: none;
          color: #6c757d;
          padding: 0.25rem;
        }
        
        .sort-btn:hover {
          color: #0d6efd;
          background-color: rgba(13, 110, 253, 0.1);
        }
        
        .action-btn {
          background: none;
          border: none;
          color: #6c757d;
          padding: 0.5rem;
        }
        
        .action-btn:hover {
          color: #0d6efd;
          background-color: rgba(13, 110, 253, 0.1);
        }
        
        .pagination-sm .page-link {
          border-radius: 6px;
          margin: 0 2px;
          border: 1px solid #dee2e6;
        }
        
        .pagination-sm .page-item.active .page-link {
          background-color: #0d6efd;
          border-color: #0d6efd;
        }
        
        .card {
          border-radius: 12px;
        }
        
        .shadow-sm {
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
        }

        .fw-bold {
          font-weight: 700 !important;
        }

        .fw-semibold {
          font-weight: 600 !important;
        }

        .fw-medium {
          font-weight: 500 !important;
        }
      `}</style>
    </div>
  );
};

export default EmailList;
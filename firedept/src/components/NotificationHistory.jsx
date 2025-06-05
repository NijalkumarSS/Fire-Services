import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsEye } from 'react-icons/bs';

const rawData = [
  {
    recipient: 'John Doe',
    email: 'john.doe@example.com',
    type: 'NOC Application',
    template: 'NOC Application Received',
    status: 'delivered',
    sentAt: '2023-08-15 09:30:45',
    opened: '2023-08-15 10:15:22',
  },
  {
    recipient: 'Jane Smith',
    email: 'jane.smith@example.com',
    type: 'Inspection',
    template: 'Inspection Scheduled',
    status: 'delivered',
    sentAt: '2023-08-14 14:22:10',
    opened: '2023-08-14 15:05:33',
  },
  {
    recipient: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    type: 'Fire Safety Plan',
    template: 'Fire Safety Plan Approval',
    status: 'delivered',
    sentAt: '2023-08-13 11:45:30',
    opened: '2023-08-13 13:20:15',
  },
  {
    recipient: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    type: 'NOC Application',
    template: 'NOC Application Approved',
    status: 'delivered',
    sentAt: '2023-08-12 16:10:05',
    opened: 'Not opened',
  },
  {
    recipient: 'Michael Brown',
    email: 'michael.brown@example.com',
    type: 'Reminder',
    template: 'Document Submission Reminder',
    status: 'failed',
    sentAt: '2023-08-11 08:55:20',
    opened: 'Not opened',
  },
];

const NotificationHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [filterStatus, setFilterStatus] = useState('All Statuses');

  const filteredData = rawData.filter((d) => {
    const matchesSearch =
      d.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.template.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'All Types' || d.type === filterType;
    const matchesStatus = filterStatus === 'All Statuses' || d.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="container-fluid mt-4">
      <h3 className="fw-bold">Notification History</h3>
      <p>View history of all sent notifications</p>

      <div className="d-flex mb-3 gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search by recipient or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option>All Types</option>
          <option>NOC Application</option>
          <option>Inspection</option>
          <option>Fire Safety Plan</option>
          <option>Reminder</option>
        </select>
        <select
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All Statuses</option>
          <option>delivered</option>
          <option>failed</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Recipient</th>
              <th>Type</th>
              <th>Template</th>
              <th>Status</th>
              <th>Sent At</th>
              <th>Opened</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((d, index) => (
                <tr key={index}>
                  <td>
                    <strong>{d.recipient}</strong>
                    <div className="text-muted">{d.email}</div>
                  </td>
                  <td>{d.type}</td>
                  <td>{d.template}</td>
                  <td>
                    <span
                      className={`badge rounded-pill ${
                        d.status === 'delivered'
                          ? 'bg-light text-dark border'
                          : 'bg-danger'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td>{d.sentAt}</td>
                  <td>{d.opened}</td>
                  <td>
                    <BsEye className="fs-5" role="button" title="View Details" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No matching notifications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination UI (optional logic can be added later) */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">Previous</span>
          </li>
          <li className="page-item active">
            <span className="page-link">1</span>
          </li>
          <li className="page-item">
            <span className="page-link">2</span>
          </li>
          <li className="page-item">
            <span className="page-link">3</span>
          </li>
          <li className="page-item">
            <span className="page-link">Next</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NotificationHistory;

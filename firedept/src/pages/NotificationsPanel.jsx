import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationHistory from '../components/NotificationHistory';
import axios from 'axios';

const NotificationsPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Email Templates');
  const [selectedSubTab, setSelectedSubTab] = useState('NOC Application');

  const [showModal, setShowModal] = useState(false);

  const [applicationId, setApplicationId] = useState('');
  
  

const generateApplicationId = () => {
  const prefix = 'APP';
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `${prefix}-${timestamp}-${random}`;
};
const handleEditTemplate = () => {
  const newId = generateApplicationId();
  setApplicationId(newId);

  // Optional: insert ID into template body
  setTemplate((prev) => ({
  ...prev,
  applicantid: 'Application Id : '+ newId
}));


  setShowTemplateEditor(true); // If you use this to open modal or editor
};
  const [template, setTemplate] = useState({
    Toemail: "example@gmail.com",
    subject: 'Your NOC Application Has Been Received',
    body: `Dear {{Name}},

We have received your No Objection Certificate (NOC) application for {{buildingName}}. Your application ID is given below .

Our team will review your application and get back to you within 5 business days.

Thank you.`,
    applicantid:`{{applicationId}}`,
  });

  const handleTabClick = (tab) => {
    if (tab === 'Notification History') {
      navigate('/notifications');
    } else {
      setActiveTab(tab);
    }
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setTemplate({ ...template, [e.target.name]: e.target.value });
  };

  const handleSave = async() => {
      const newId = generateApplicationId(); // Always generate a new one
  setApplicationId(newId); 
     try {

      const uploaddata = new FormData();
      uploaddata.append('Toemail',template.Toemail);
      uploaddata.append('subject',template.subject);
      uploaddata.append('body',template.body);
      uploaddata.append('applicantid',template.applicantid);
      const response = await axios.post('http://localhost:8080/project/notificationtemplate',uploaddata);

      console.log('Notification sent:', response.data);
      alert('Notification sent successfully');
      
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
    // console.log('Saved Template:', template);
    //   setShowModal(false);
    
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold">Notifications Management</h2>
      <p>Manage and send notifications to users for NOC applications, inspections, and fire safety plans</p>

      <div className="d-flex justify-content-between mb-3">
        {['Email Templates', 'Notification History', 'Bulk Notifications','Settings'].map((tab, i) => (
          <button
            key={i}
            className={`btn ${activeTab === tab ? 'btn-warning' : 'btn-light'} rounded-3 px-3`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border rounded-3 p-3">
        <h5 className="fw-semibold">Email Templates</h5>
        <p className="text-muted">Manage email templates for different notification types</p>

       <div className="d-flex gap-2 flex-wrap mb-3">
        {['NOC Application', 'Inspection', 'Fire Safety Plan', 'Reminder', 'Approval', 'Rejection'].map((tab, i) => (
            <button
            key={i}
            className={`btn ${selectedSubTab === tab ? 'btn-warning border' : 'btn-light'} rounded-3`}
            onClick={() => setSelectedSubTab(tab)}
            >
            {tab}
            </button>
        ))}
        <button className="btn btn-dark ms-auto">
            <i className="bi bi-plus-lg me-1"></i> New Template
        </button>
        </div>

        {/* Template Card */}
        {(selectedSubTab === 'NOC Application' || selectedSubTab === 'Inspection' || selectedSubTab === 'Fire Safety Plan') && (
  <div className="border rounded-3 p-3 mb-3">
    <div className="d-flex justify-content-between">
      <h6 className="fw-bold mb-0">
        {selectedSubTab === 'NOC Application' && 'NOC Application Received'}
        {selectedSubTab === 'Inspection' && 'Inspection Scheduled'}
        {selectedSubTab === 'Fire Safety Plan' && 'Fire Safety Plan Submission Acknowledged'}
      </h6>
      <div className="d-flex gap-3">
        <i className="bi bi-eye" title="View"></i>
        <i className="bi bi-pencil-square" title="Edit"></i>
        <i className="bi bi-trash" title="Delete"></i>
      </div>
    </div>

    <div className="mt-2">
      <p className="mb-1">
        <strong>Subject:</strong>
        {selectedSubTab === 'NOC Application' && ' Your NOC Application Has Been Received'}
        {selectedSubTab === 'Inspection' && ' Your Inspection Has Been Scheduled'}
        {selectedSubTab === 'Fire Safety Plan' && ' Your Fire Safety Plan Has Been Submitted'}
      </p>
      <p className="mb-1">
        <strong>Variables:</strong>
        {selectedSubTab === 'NOC Application' && ' name, buildingName, applicationId'}
        {selectedSubTab === 'Inspection' && ' name, inspectorName, inspectionDate'}
        {selectedSubTab === 'Fire Safety Plan' && ' name, planId, submissionDate'}
      </p>
      <p className="text-muted small">Last updated: 2023-05-15</p>
    </div>

        <button
      className="btn btn-outline-dark mt-2"
      onClick={() => {
        handleEditClick();     
        handleEditTemplate();   
      }}
    >
  Edit Template
</button>

  </div>
)}


      </div>

      
    
      {activeTab === 'Settings' && <div>Settings content here</div>}

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Email Template</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="text" name="Toemail" value={template.Toemail} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input type="text" name="subject" value={template.subject} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Body</label>
                  <textarea name="body" rows="8" value={template.body} onChange={handleChange} className="form-control"></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Variables</label>
                  <input type="text" name="applicantid" value={template.applicantid} onChange={handleChange} className="form-control" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default NotificationsPanel;

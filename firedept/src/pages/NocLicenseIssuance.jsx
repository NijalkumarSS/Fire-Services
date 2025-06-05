import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import LicenseSettings from '../components/LicenseSettings';
import NocPreview from './NocPreview';
import axios from 'axios';
import NocCertificate from './NocCertificate';
import CertificateList from './CertificateList';

const NocLicenseIssuance = () => {
  const [activeTab, setActiveTab] = useState('Issue License');
  const [emailNotify, setEmailNotify] = useState(false);
  const [officer, setOfficer] = useState('Chief Fire Officer');
  const [selectedBuildingId, setSelectedBuildingId] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBuildingCompleted, setIsBuildingCompleted] = useState(true);

  const [issueDate, setIssueDate] = useState('2025-05-10');
  const [expiryDate, setExpiryDate] = useState('2026-05-10');
  const [nocNumber, setNocNumber] = useState('NOC-2023-001');
  const [conditions, setConditions] = useState(`1. All fire safety equipment must be maintained in good working condition.
2. Fire drills must be conducted quarterly.
3. Fire safety plan must be displayed prominently.
4. Emergency exits must be kept clear at all times.`);

  useEffect(() => {
    axios.get("http://localhost:8080/project/getuploads")
      .then((response) => {
        setBuildings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching buildings:", error);
        setLoading(false);
      });
  }, []);

  const handleBuildingSelect = (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      axios.get(`http://localhost:8080/project/building/${selectedId}`)
        .then((response) => {
          const buildingData = response.data;
          setSelectedBuildingId(buildingData);
          setIsBuildingCompleted(buildingData.completed === true);
          console.log("Fetched Building Details:", buildingData);
        })
        .catch((error) => {
          console.error("Error fetching building details:", error);
        });
    }
  };

  const handleIssueDateChange = (e) => setIssueDate(e.target.value);
  const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const handleNocNumberChange = (e) => setNocNumber(e.target.value);
  const handleConditionsChange = (e) => setConditions(e.target.value);

  const tabs = [
    { key: 'preview', label: 'Preview Certificate', icon: 'bi-eye', colour:'bg-light' },
    { key: 'generate', label: 'Generate Certificate', icon: 'bi-file-earmark-arrow-down', colour:'bg-dark text-white' }
  ];

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold">NOC Issuance</h2>
      <p className="text-muted">Issue and manage No Objection Certificates (NOC) for buildings</p>

      <div className="d-flex border-bottom mb-3 justify-content-between">
        {['Issue License', 'License History', 'Settings'].map((tab, index) => (
          <button
            key={index}
            className={`btn px-4 py-2 border-0 ${activeTab === tab ? 'bg-white fw-semibold' : 'bg-light text-muted'}`}
            onClick={() => setActiveTab(tab)}
            style={{ borderRadius: 0 }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Issue License' && (
        <div className="border rounded-4 p-4 bg-white">
          <h5 className="fw-bold">Issue NOC License</h5>
          <p className="text-muted">Fill out the form to issue a new No Objection Certificate</p>

          <div className="border rounded-3 p-3 mb-4">
            <h6 className="fw-bold">Building Information</h6>
            <p className="text-muted small">Select the building for which the NOC is being issued</p>
            <Form.Group className="mt-2">
              <Form.Label className="fw-semibold">Building</Form.Label>
              <Form.Select onChange={handleBuildingSelect}>
                <option value="">Select building...</option>
                {!loading && buildings.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.uploadername} - {building.building} - {building.completed === false ? 'Not Completed' : 'Completed'}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          {!isBuildingCompleted && (
            <div className="alert alert-warning">
              This building is marked as <strong>Not Completed</strong>. Certificate inputs are disabled.
            </div>
          )}

          <div className="border rounded-3 p-3 mb-3">
            <h6 className="fw-bold">Certificate Information</h6>
            <p className="text-muted small">Enter the details for the NOC license</p>

            <Form.Group className="mb-3">
              <Form.Label>License Type</Form.Label>
              <Form.Control
                type="text"
                value={selectedBuildingId?.documentType || 'NOC Application'}
                readOnly
              />
            </Form.Group>

            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Label>Issue Date</Form.Label>
                <Form.Control
                  type="date"
                  value={issueDate}
                  onChange={handleIssueDateChange}
                  disabled={!isBuildingCompleted}
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  disabled={!isBuildingCompleted}
                />
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                value={nocNumber}
                onChange={handleNocNumberChange}
                disabled={!isBuildingCompleted}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Conditions</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={conditions}
                onChange={handleConditionsChange}
                disabled={!isBuildingCompleted}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="officerSignature">
              <Form.Label><strong>Officer Signature</strong></Form.Label>
              <Form.Select
                value={officer}
                onChange={(e) => setOfficer(e.target.value)}
                disabled={!isBuildingCompleted}
              >
                <option>Chief Fire Officer</option>
                <option>Deputy Fire Officer</option>
                <option>Station Officer</option>
              </Form.Select>
            </Form.Group>

            <Form.Check
              type="switch"
              id="emailNotify"
              label="Send email notification to building owner"
              checked={emailNotify}
              onChange={(e) => setEmailNotify(e.target.checked)}
              className="mb-4"
              disabled={!isBuildingCompleted}
            />

            <div className="d-flex">
              {tabs.map((tab) => (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? 'primary' : 'light'}
                  className={`border me-2 ${tab.colour}`}
                  onClick={() => handleTabClick(tab.key)}
                  disabled={!isBuildingCompleted}
                >
                  <i className={`bi ${tab.icon} me-2`}></i>
                  {tab.label}
                </Button>
              ))}
            </div>
{/* 
            <div className="text-end mt-3">
              <Button variant="dark" disabled={!isBuildingCompleted}>
                <i className="bi bi-file-earmark-text me-2"></i>Issue Certificate
              </Button>
            </div> */}
          </div>
        </div>
      )}

      {activeTab === 'License History' && (
        <CertificateList/>
      )}

      {activeTab === 'preview' && <NocPreview />}
      {activeTab === 'Settings' && <LicenseSettings />}
      {activeTab === 'generate' && (
        <NocCertificate
          selectedBuildingId={selectedBuildingId}
          issueDate={issueDate}
          expiryDate={expiryDate}
          nocNumber={nocNumber}
          conditions={conditions.split('\n')}
          email={selectedBuildingId?.email}        />
      )}
    </div>
  );
};

export default NocLicenseIssuance;

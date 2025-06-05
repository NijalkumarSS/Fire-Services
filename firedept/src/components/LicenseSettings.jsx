import React, { useState } from 'react';

const LicenseSettings = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [settings, setSettings] = useState({
    permanentNoc: '1 year',
    temporaryNoc: '3 months',
    provisionalNoc: '3 months',
    renewalNoc: '1 year',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saved settings:', settings);
   
  };

   const [settings2, setSettings2] = useState({
    nocIssued: false,
    nocExpiryReminder: false,
    daysBeforeExpiry: '30 days',
  });

  const handleToggle = (field) => {
    setSettings2((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleDropdownChange = (e) => {
    setSettings2((prev) => ({
      ...prev,
      daysBeforeExpiry: e.target.value,
    }));
  };

  const handleSave2 = () => {
    console.log('Saved Notification Settings:', settings2);
    // API call or logic here
  };

  return (
    <>
    <div className="container py-4">
      <h3 className="fw-bold">License Settings</h3>
      <p className="text-muted">Configure NOC license settings and defaults</p>

      {/* Tabs */}
      <div className="d-flex border-bottom mb-4">
        {['General', 'Templates', 'Numbering'].map((tab) => (
          <button
            key={tab}
            className={`flex-fill text-center py-2 px-4 border border-bottom-0 ${activeTab === tab ? 'bg-white fw-semibold' : 'bg-light text-muted'}`}
            style={{ borderRadius: 0 }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="border rounded-4 p-4 bg-white">
        {activeTab === 'General' && (
          <>
            <h5 className="fw-bold">License Validity</h5>
            <p className="text-muted">Configure default validity periods for different license types</p>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Permanent NOC Validity (years)</label>
                <select
                  className="form-select"
                  name="permanentNoc"
                  value={settings.permanentNoc}
                  onChange={handleChange}
                >
                  <option>1 year</option>
                  <option>2 years</option>
                  <option>5 years</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Provisional NOC Validity (months)</label>
                <select
                  className="form-select"
                  name="provisionalNoc"
                  value={settings.provisionalNoc}
                  onChange={handleChange}
                >
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>12 months</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Temporary NOC Validity (months)</label>
                <select
                  className="form-select"
                  name="temporaryNoc"
                  value={settings.temporaryNoc}
                  onChange={handleChange}
                >
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>12 months</option>
                </select>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">NOC Renewal Validity (years)</label>
                <select
                  className="form-select"
                  name="renewalNoc"
                  value={settings.renewalNoc}
                  onChange={handleChange}
                >
                  <option>1 year</option>
                  <option>2 years</option>
                  <option>3 years</option>
                </select>
              </div>
            </div>

            <button className="btn btn-dark" onClick={handleSave}>
              <i className="bi bi-save me-2"></i>Save Validity Settings
            </button>
          </>
        )}

        {activeTab === 'Templates' && (
          <>
            <h5 className="fw-bold">Templates</h5>
            <p className="text-muted">Configure document templates for NOC licenses</p>
            {/* Add template inputs if needed */}
          </>
        )}

        {activeTab === 'Numbering' && (
          <>
            <h5 className="fw-bold">Numbering</h5>
            <p className="text-muted">Define how license numbers are generated</p>
            
          </>
        )}
      </div>
    </div>

     <div className="container mt-5">
      <div className="border rounded-4 p-4 bg-white">
        <h4 className="fw-bold">Notification Settings</h4>
        <p className="text-muted mb-4">Configure notification settings for NOC licenses</p>

        {/* NOC Issued Notification */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h6 className="fw-semibold mb-1">NOC Issued Notification</h6>
            <p className="text-muted mb-0">Send notification when a new NOC is issued</p>
          </div>
          <div className="form-check form-switch fs-4">
            <input
              className="form-check-input"
              type="checkbox"
              checked={settings2.nocIssued}
              onChange={() => handleToggle('nocIssued')}
            />
          </div>
        </div>

        <hr />

        {/* NOC Expiry Reminder */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="fw-semibold mb-1">NOC Expiry Reminder</h6>
            <p className="text-muted mb-0">Send reminder before NOC expires</p>
          </div>
          <div className="form-check form-switch fs-4">
            <input
              className="form-check-input"
              type="checkbox"
              checked={settings2.nocExpiryReminder}
              onChange={() => handleToggle('nocExpiryReminder')}
            />
          </div>
        </div>

        {/* Days Before Expiry Dropdown */}
        <div className="mb-4 ms-2">
          <label className="form-label">Days before expiry</label>
          <select
            className="form-select"
            value={settings2.daysBeforeExpiry}
            onChange={handleDropdownChange}
            style={{ maxWidth: '250px' }}
          >
            <option>7 days</option>
            <option>15 days</option>
            <option>30 days</option>
            <option>60 days</option>
          </select>
        </div>

        
        <button className="btn btn-dark" onClick={handleSave2}>
          <i className="bi bi-floppy2-fill me-2"></i>
          Save Notification Settings
        </button>
      </div>
    </div>
    </>
  );
};

export default LicenseSettings;

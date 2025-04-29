import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const UploadDocument = () => {
    
  const [formData, setFormData] = useState({
    building: '',
    documentType: '',
    designation: '',
    location: '',
    pincode: '',
    file: null,
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const uploadData = new FormData();
      uploadData.append('building', formData.building);
      uploadData.append('documentType', formData.documentType);
      uploadData.append('designation', formData.designation);
      uploadData.append('location', formData.location);
      uploadData.append('pincode', formData.pincode);
      uploadData.append('notes', formData.notes);
      uploadData.append('file', formData.file); // important!

      const response = await axios.post('http://localhost:8080/project/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload Success:', response.data);
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };

  return (
    <>
      <header className="backgroundColour p-2 border">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-8 d-flex align-items-center">
              <i className="fa-solid fa-fire-extinguisher text-light fs-5 me-2"></i>
              <h4 className="fw-bold text-dark mb-0">FireGuard</h4>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <button
                className="btn btn-sm btn-outline-light rounded me-2 position-relative"
                style={{ fontSize: "14px", padding: "5px 10px" }}
              >
                <i className="bi bi-bell"></i>
                <span className="badge position-absolute top-0 start-100 translate-middle bg-danger rounded-circle">
                  10
                </span>
              </button>
              <button className="rounded-circle p-3 border border-danger bg-white"></button>
            </div>
          </div>
        </div>
      </header>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <h2 className="fw-bold">Upload Document</h2>
            <p className="text-muted mb-4">Upload your fire safety documents for verification</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Building <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select building</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Occupancies">Occupancies</option>
                  <option value="Storage">Storage</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Document Type <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select document type</option>
                  <option value="NOC Application">NOC Application</option>
                  <option value="Fire Safety Plan">Fire Safety Plan</option>
                  <option value="Inspection Report">Inspection Report</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  User Designation <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  placeholder="Enter your Designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Location <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"


                  name="location"
                  placeholder="Enter the location of your building"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Pincode <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Document File <span className="text-danger">*</span>
                </label>
                <div className="border rounded p-4 text-center" style={{ borderStyle:'dashed'}}>
                  <input
                    type="file"
                    name="file"
                    accept=".pdf,.jpg,.png"
                    className="form-control mb-2"
                    onChange={handleFileChange}
                    required
                  />
                  <small className="text-muted">Supports PDF, JPG, PNG (Max 50MB)</small>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Additional Notes</label>
                <textarea
                  className="form-control"
                  name="notes"
                  rows="3"
                  placeholder="Add any relevant information about this document"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-4">
                <div className="border rounded p-3 bg-light">
                  <div className="fw-semibold mb-2">
                    <i className="bi bi-info-circle me-2"></i> Document Requirements
                  </div>
                  <ul className="mb-0">
                    <li>All documents must be clearly legible</li>
                    <li>Documents must be signed by authorized personnel</li>
                    <li>Include all pages of multi-page documents</li>
                    <li>Ensure document date and certification numbers are visible</li>
                  </ul>
                </div>
              </div>

              <div className="d-flex flex-column flex-sm-row justify-content-between gap-5">
                <button type="button" className="btn btn-outline-secondary w-25 w-sm-auto">
                  Cancel
                </button>
                <button type="submit" className="btn btn-secondary w-25 w-sm-auto">
                  Upload Document
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadDocument;

import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UploadDocument = () => {

  const navigate = useNavigate();

  const storedEmail = localStorage.getItem('GetEmail');
  const storedName = localStorage.getItem('GetName');
  

  const [formData, setFormData] = useState({
    uploadername:'',
    age:'',
    dob:'',
    gender:'',
    adharno:'',
    pancardno:'',
    address:'',
    email:'',
    mobilenumber:'',
    building: '',
    documentType: '',
    designation: '',
    location: '',
    pincode: '',
    file: null,
    notes: '',
    image:null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e) => {
  //   setFormData((prev) => ({ ...prev, file: e.target.files[0],image: e.target.files[0] }));
  // };
  const handleFileChange = (e) => {
  const { name, files } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: files[0]
  }));
};


  const verify = async (e) => {
    e.preventDefault();
    try{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid Email Address");
      } else if (formData.adharno.length > 12 || formData.adharno.length < 12) {
        alert('Please enter valid Adhar Number');
      } else if (formData.pancardno.length > 10 || formData.pancardno.length < 10) {
        alert('Please enter valid Pan Card Number');
      } else if (formData.mobilenumber.length > 10 || formData.mobilenumber.length < 10) {
        alert('Please enter valid Mobile Number');
      } else {
        const email = formData.email
    const response = await axios.post("http://localhost:8080/otp/send",{email})
    console.log(email);
    if (response.data === "OTP sent to email.") {
  navigate("/verifyotp", { state: { email, formData } });
}
else{
      alert("OTP not sent")
      console.log(email);
    } 
  }
}
catch(error){
  alert(error);
}  
};
  const backwardd = () => {
    navigate("/userspage")
  }
  
 
  return (
    <>
      <header className="backgroundColour p-2 border">
  <div className="d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      <button
        className="btn btn-outline-danger d-block d-md-none me-2"
      >
        <i className="bi bi-list fs-5"></i>
      </button>
      <i className="fa-solid fa-fire-extinguisher p-1 ms-1 text-light fs-5"></i>
      <h4 className="fw-bold text-dark ms-2 mb-0 textstyle">FireGuard</h4>
    </div>

    <div className="d-flex align-items-center">
      <button className="btn  btn-outline-light rounded-circle me-2 position-relative" style={{width:'40px',height:'40px'}}>
        <i className="bi bi-bell" ></i>
        <span className="badge position-absolute top-0 start-100 translate-middle bg-danger rounded-circle">
          10
        </span>
      </button>

      <div className="rounded-circle bg-light text-dark d-flex align-items-center justify-content-center me-2" style={{ width: "40px", height: "40px" }}>
        J
      </div>
      <div className="d-flex flex-column ms-2">
  <strong className="text-light">{storedName}</strong>
  <small className="text-white">{storedEmail}</small>
</div>

    </div>
  </div>
</header>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <h2 className="fw-bold textstyle">Upload Document</h2>
            <p className="text-muted mb-4">Upload your fire safety documents for verification</p>

            <form onSubmit={verify}>
              <label className='form-label fw-bold h5 mb-3' > Personal Details </label>
            <div className="mb-3">
                <label className="form-label fw-semibold">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="uploadername"
                  placeholder="Enter your name"
                  value={formData.uploadername}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Age<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  DOB<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  placeholder=""
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
  <label className="form-label d-block fw-semibold">Gender</label>

  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      id="genderMale"
      value="Male"
      checked={formData.gender === "Male"}
      onChange={handleChange}
      required
    />
    <label className="form-check-label" htmlFor="genderMale">Male</label>
  </div>

  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      id="genderFemale"
      value="Female"
      checked={formData.gender === "Female"}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="genderFemale">Female</label>
  </div>

  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      id="genderOther"
      value="Prefer not to say"
      checked={formData.gender === "Prefer not to say"}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="genderOther">Prefer not to say</label>
  </div>
</div>
<div className="mb-3">
                <label className="form-label fw-semibold">
                  Email<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Enter your mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                Designation <span className="text-danger">*</span>
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
                  AdharCardNo.<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="adharno"
                  placeholder=""
                  value={formData.adharno}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Pan Card No.<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pancardno"
                  placeholder=""
                  value={formData.pancardno}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Permanent Address<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Mobile Number <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="mobilenumber"
                  value={formData.mobilenumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <hr />

              <label className='form-label fw-bold h5 mb-4 mt-3' > Building Details </label>

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
              Image<span className="text-danger">*</span>
            </label>
            <div className="border rounded p-4 text-center" style={{ borderStyle: 'dashed' }}>
              <input
                type="file"
                name="image"
                accept=".pdf,.jpg,.png"
                className="form-control mb-2"
                onChange={handleFileChange}
                required
              />
              <small className="text-muted">Upload your Image</small>
            </div>
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
                  <small className="text-muted"><marquee behavior="alternate" direction="left">Upload documents through PDF (Max 50MB)</marquee></small>
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
                <button type="button" className="btn btn-outline-secondary w-25 w-sm-auto" onClick={backwardd}>
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

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UploadSuccess = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
      <div className="text-center">
        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "4rem" }}></i>
        <h2 className="text-success mt-3">Upload Successful</h2>
        <p className="lead">Your document has been uploaded successfully.</p>
        <a href="/buildings" className="btn btn-primary mt-3">Go Back to Dashboard</a>
      </div>
    </div>
  );
};

export default UploadSuccess;

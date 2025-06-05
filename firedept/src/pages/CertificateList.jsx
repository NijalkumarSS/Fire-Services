import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/project/api/certificates/all')
      .then(res => setCertificates(res.data))
      .catch(err => console.error('Error loading certificates:', err));
  }, []);

  const handleView = (base64Pdf) => {
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src='data:application/pdf;base64,${base64Pdf}'></iframe>`
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Fire Safety Certificates</h2>
      <div className="row">
        {certificates.map((cert, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{cert.uploaderName} - {cert.buildingName}</h5>
              </div>
              <div className="card-body">
                <p><strong>NOC No:</strong> {cert.nocNumber}</p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleView(cert.pdfBase64)}
                >
                  View Certificate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateList;

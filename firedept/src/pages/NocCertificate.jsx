import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import signature from '../assets/signature1.png';
import TN_logo from '../assets/TN_logo.png';

const NocCertificate = ({ selectedBuildingId, issueDate, expiryDate, nocNumber, conditions,email }) => {

  const [showModal, setShowModal] = useState(false);

const handleIssueClick = () => {
  setShowModal(true);
};

const handleConfirmIssue = async () => {
  const certificateData = {
    nocNumber:nocNumber,
    adharno: selectedBuildingId?.adharno,
    uploaderName: selectedBuildingId?.uploadername,
    buildingName: selectedBuildingId?.buildingType,
    buildingAddress: selectedBuildingId?.address,
    documentType: selectedBuildingId?.documentType,
    buildingType: selectedBuildingId?.buildingType,
    issueDate:issueDate,
    expiryDate:expiryDate,
    conditions: "Fire extinguishers on every floor, Emergency exits clearly marked",
    email: email
  };

  await fetch("http://localhost:8080/project/api/certificates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(certificateData)
  });

  setShowModal(false);
  alert("Certificate issued and saved to database.");
};


const handleCloseModal = () => {
  setShowModal(false);
};

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    const logo = await fetch(TN_logo).then(r => r.blob());
    const logoData = await convertBlobToBase64(logo);
    doc.addImage(logoData, 'PNG', pageWidth / 2 - 25, y, 50, 30);
    y += 35;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("GOVERNMENT OF INDIA", pageWidth / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("FIRE SAFETY DEPARTMENT", pageWidth / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("NO OBJECTION CERTIFICATE", pageWidth / 2, y, { align: "center" });
    y += 15;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(
      "This is to certify that the building described below complies with the essential fire prevention\n" +
      "and fire safety requirements in accordance with the National Building Code of India and has been\n" +
      "issued a No Objection Certificate (NOC) as per the Fire Safety Act.",
      15, y
    );
    y += 30;

    const lineGap = 8;
    doc.text(`Certificate Number: ${nocNumber}`, 15, y); y += lineGap;
    doc.text(`Applicant Number: ${selectedBuildingId?.adharno || ''}`, 15, y); y += lineGap;
    doc.text(`Applicant Name: ${selectedBuildingId?.uploadername || ''}`, 15, y); y += lineGap;
    doc.text(`Building Name: ${selectedBuildingId?.buildingType || ''}`, 15, y); y += lineGap;
    doc.text(`Building Address: ${selectedBuildingId?.address || ''}`, 15, y); y += lineGap;
    doc.text(`Document Type: ${selectedBuildingId?.documentType || ''}`, 15, y); y += lineGap;
    doc.text(`Building Type: ${selectedBuildingId?.buildingType || ''}`, 15, y); y += lineGap;
    doc.text(`Issue Date: ${issueDate}`, 15, y); y += lineGap;
    doc.text(`Expiry Date: ${expiryDate}`, 15, y); y += lineGap;

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Conditions:", 15, y);
    doc.setFont("helvetica", "normal");
    y += 5;

    conditions?.forEach((item, index) => {
      doc.text(`• ${item}`, 20, y);
      y += 6;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    y += 20;

    const sign = await fetch(signature).then(r => r.blob());
    const signData = await convertBlobToBase64(sign);
    doc.addImage(signData, 'PNG', pageWidth - 60, y, 40, 20);
    y += 25;

    doc.setFont("helvetica", "bold");
    doc.text("Authorized Signatory", pageWidth - 60, y, { align: "left" });
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.text("Fire Safety Department", pageWidth - 60, y, { align: "left" });

    y += 15;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text("This certificate is issued by the Fire Safety Department, Government of India.", pageWidth / 2, y, { align: "center" });
    y += 5;
    doc.text("Verify this certificate at: https://firesafety.gov.in/verify", pageWidth / 2, y, { align: "center" });

    doc.save(`NOC_${nocNumber || 'certificate'}.pdf`);
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  return (
    <>
      <div className="container my-4 border p-5 bg-white">
        <img src={TN_logo} alt="Logo" style={{ height: "80px", display: "block", margin: "0 auto" }} />
        <h4 className="text-center mt-3">GOVERNMENT OF TAMIL NADU</h4>
        <h5 className="text-center">FIRE SAFETY DEPARTMENT</h5>
        <h5 className="text-center fw-bold">NO OBJECTION CERTIFICATE</h5>

       <p className="mt-4" style={{ textIndent: "2em" }}>
  This is to certify that the building described below complies with the essential fire prevention
  and fire safety requirements in accordance with the National Building Code of India and has been
  issued a No Objection Certificate (NOC) as per the Fire Safety Act.
</p> <br /><br />


    <p><strong>Certificate Number:</strong> {nocNumber}</p>
<p><strong>Applicant Number:</strong> {selectedBuildingId?.adharno || ''}</p>
<p><strong>Applicant Name:</strong> {selectedBuildingId?.uploadername || ''}</p>
<p><strong>Building Name:</strong> {selectedBuildingId?.buildingType || ''}</p>
<p><strong>Building Address:</strong> {selectedBuildingId?.address || ''}</p>
<p><strong>Document Type:</strong> {selectedBuildingId?.documentType || ''}</p>
<p><strong>Building Type:</strong> {selectedBuildingId?.buildingType || ''}</p>
<p><strong>Issue Date:</strong> {issueDate}</p>
<p><strong>Expiry Date:</strong> {expiryDate}</p>




        <p><strong>Conditions:</strong></p>
        <ul>
          {conditions?.map((c, i) => <li key={i}>{c}</li>)}
        </ul>

        <div className="text-end mt-4">
          <img src={signature} alt="Sign" style={{ height: "50px" }} />
          <p className="mb-0"><strong>Authorized Signatory</strong></p>
          <p>Fire Safety Department</p>
        </div>

        <div className="text-center mt-4 text-secondary" style={{ fontSize: "0.9rem" }}>
          <p>This certificate is issued by the Fire Safety Department, Government of India.</p>
          <p>Verify this certificate at: <a href="https://firesafety.gov.in/verify">https://firesafety.gov.in/verify</a></p>
        </div>
      </div>

      <div className="d-flex gap-2 my-3">
        <button className="btn btn-outline-primary" onClick={handleDownloadPDF}>
          <i className="bi bi-download"></i> Download PDF Certificate
        </button>
      <button className="btn text-light bg-dark" onClick={handleIssueClick}>
  <i className="bi bi-file-earmark-arrow-down"></i> Issue Certificate
</button>

      </div>
      {showModal && (
  <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Issue</h5>
          <button type="button" className="btn-close" onClick={handleCloseModal}></button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to issue this certificate?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn backgroundColour text-white" onClick={handleCloseModal}>Cancel</button>
          <button type="button" className="btn btn-success" onClick={handleConfirmIssue}>Yes, Issue</button>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default NocCertificate;

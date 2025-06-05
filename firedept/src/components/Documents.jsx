import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Documents = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/project/getuploads")
      .then((response) => {
        const enrichedData = response.data.map((item) => ({
          ...item,
          status: item.completed ? "Complete" : "Not Complete",
        }));
        setProducts(enrichedData);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const handleViewImage = (id) => {
    setSelectedImageUrl(`http://localhost:8080/project/image/${id}`);
    setShowImageModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBuildings = products.filter((building) => {
    const uploaderName = building.uploadername?.toLowerCase() || "";
    const address = building.address?.toLowerCase() || "";
    const buildingType = building.building?.toLowerCase() || "";
    const documentType = building.documentType?.toLowerCase() || "";
    const status = building.status?.toLowerCase() || "";
    const pincode = building.pincode?.toString() || "";
    const designation = building.designation?.toLowerCase() || "";

    const search = searchTerm.toLowerCase();

    return (
      uploaderName.includes(search) ||
      address.includes(search) ||
      buildingType.includes(search) ||
      documentType.includes(search) ||
      status.includes(search) ||
      pincode.includes(search) ||
      designation.includes(search)
    );
  });

  const handleDownloadExcel = () => {
    const dataForExcel = filteredBuildings.map((building, index) => ({
      "S/No.": index + 1,
      "Applicant Name": building.uploadername,
      "Application Type": building.documentType,
      Designation: building.designation,
      "Uploader Image URL": `http://localhost:8080/project/image/${building.id}`,
      "PDF URL": building.pdfUrl || "No PDF",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Documents");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Uploaded_Documents.xlsx");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search buildings..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div>
          {/* <button className="btn btn-success me-2" onClick={handleDownloadExcel}>
            Download Excel
          </button> */}
          <button className="btn btn-dark">+ Add Building</button>
        </div>
      </div>

      <table className="table table-hover">
        <thead className="thead-light">
          <tr className="text-center">
            <th>S/No.</th>
            <th>Applicant Name</th>
            <th>Application Type</th>
            <th>Designation</th>
            <th>UploaderImage</th>
            <th>Files</th>
          </tr>
        </thead>
        <tbody>
          {filteredBuildings.length > 0 ? (
            filteredBuildings.map((building, index) => (
              <tr key={building.id} className="text-center">
                <td>{index + 1}</td>
                <td>{building.uploadername}</td>
                <td>{building.documentType}</td>
                <td>{building.designation}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => handleViewImage(building.id)}
                  >
                    View Image
                  </button>
                </td>
                <td>
                  {building.pdfUrl ? (
                    <a
                      href={building.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-warning"
                    >
                      View PDF
                    </a>
                  ) : (
                    <span className="text-muted">No PDF</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No buildings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showImageModal && (
        <div
          className="modal show fade"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Uploader Image</h5>
                <button
                  type="button"
                  className="close btn"
                  onClick={() => setShowImageModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={selectedImageUrl}
                  alt="Uploader"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;

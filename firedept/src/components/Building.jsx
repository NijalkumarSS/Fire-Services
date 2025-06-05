
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const Building = () => {

  const [showModal, setShowModal] = useState(false);
const [selectedBuilding, setSelectedBuilding] = useState(null);

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showModal]);
  

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  

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

  const exportToExcel = () => {
  const dataToExport = filteredBuildings.map((building) => ({
    ID: building.id,
    UploaderName: building.uploadername,
    Address: building.address,
    Pincode: building.pincode,
    BuildingType: building.building,
    Status: building.status,
    Email: building.email,
    PhoneNumber: building.number,
    AdharNumber: building.adharno,
    PancardNumber: building.pancardno,
    DocumentType: building.documentType,
    Completed: building.completed ? "Yes" : "No"
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Buildings");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "building_data.xlsx");
};

  const handleDelete = (id) => {
    const buildingToDelete = products.find((building) => building.id === id);
    if (!buildingToDelete) return;
  
    if (buildingToDelete.completed === true) {
      setSelectedBuilding(buildingToDelete);
      setShowModal(true);
    } else {
      alert("Cannot delete, status is not complete.");
    }
  };
  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/project/buildingdelete/${selectedBuilding.id}`
      );
      console.log("Delete successful:", response.data);
  
      const updatedBuildings = products.filter(
        (building) => building.id !== selectedBuilding.id
      );
      setProducts(updatedBuildings);
      setShowModal(false);
      setSelectedBuilding(null);
    } catch (error) {
      console.error("Error deleting building:", error);
      alert("Failed to delete building");
    }
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBuildings = products
    .filter((building) => {
      const uploaderName = building.uploadername?.toLowerCase() || "";
      const address = building.address?.toLowerCase() || "";
      const buildingType = building.building?.toLowerCase() || "";
      const status = building.status?.toLowerCase() || "";
      const adharno = building.adharno?.toString() || '';
      const pancaardno = building.pancardno?.toString() || '';
      const phonenumber = building.number?.toString() || '';
      const pincode = building.pincode?.toString() || "";
      const email = building.email?.toString() || "";
      const document = building.documentType?.toString() || "";
      const search = searchTerm.toLowerCase();

      
      return (
        uploaderName.includes(search) ||
        address.includes(search) || 
        buildingType.includes(search) ||
        status.includes(search) ||
        pincode.includes(search)
      );
    })
    .sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });

  const handleCheckboxChange = async (id) => {
    const buildingToUpdate = products.find((building) => building.id === id);
    if (!buildingToUpdate) return;

    const isCompleted = !buildingToUpdate.completed;

    try {
      await axios.put(
        `http://localhost:8080/project/checktrue/${id}/${isCompleted}`
      );
      console.log("Update successful");

      const updatedBuildings = products.map((building) =>
        building.id === id
          ? {
              ...building,
              completed: isCompleted,
              status: isCompleted ? "Complete" : "Not Complete",
            }
          : building
      );

      setProducts(updatedBuildings);
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project status");
    }
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
        <button className="btn btn-dark" style={{marginLeft :' 300px'}}>+ Add Building</button>
           <button className="btn btn-success" onClick={exportToExcel}>
            <small>Download As Excel </small>
          </button>
      </div>

      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th></th>
            <th>Building</th>
            <th>Type</th>
            <th>Status</th>
            <th>Email</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredBuildings.length > 0 ? (
            filteredBuildings.map((building) => (
              <tr key={building.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={building.completed}
                    onChange={() => handleCheckboxChange(building.id)}
                  />
                </td>
                <td>
                  <strong>{building.uploadername}</strong>
                  <br />
                  <small>{building.address} - {building.pincode}</small>
                </td>
                <td>{building.building}</td>
                <td>
                  {building.status === "Complete" ? (
                    <span className="badge rounded-pill bg-success">
                      {building.status}
                    </span>
                  ) : (
                    <span className="badge rounded-pill bg-danger">
                      {building.status}
                    </span>
                  )}
                </td>
                <td>{building.email}</td>

                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(building.id)}
                  >
                    Delete
                  </button>
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
      {showModal && selectedBuilding && (
  <div className="modal show fade d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Deletion</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <p>
            Are you sure you want to delete the building uploaded by{" "}
            <strong>{selectedBuilding.uploadername}</strong>?
          </p>
        </div>
        <div className="modal-footer">
          <button onClick={confirmDelete} className="btn btn-danger">
            Yes, Delete
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    {/* <div className="modal-backdrop fade show"></div> */}
  </div>
)}

      
    </div>
  );
};

export default Building;





import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect } from "react";

const Building= () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/project/getuploads')
      .then(response => {
        const enrichedData = response.data.map(item => ({
          ...item,
          status: "Not complete",
          completed: false
        }));
        setProducts(enrichedData);
      })
      .catch(error => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  // const [buildings, setBuildings] = useState([
  //   { id: 1, name: " - Main Office", address: "123 Main St, New York, NY", type: "Commercial", status: "Not Complete", pincode: "10001", completed: false },
  //   { id: 2, name: "Building B - Warehouse", address: "456 Storage Ave, New York, NY", type: "Industrial", status: "Not Complete", pincode: "10002", completed: false },
  //   { id: 3, name: "Building C - Retail Store", address: "789 Market St, New York, NY", type: "Commercial", status: "Not Complete", pincode: "10003", completed: false },
  //   { id: 4, name: "Building D - Apartment Complex", address: "101 Residential Blvd, New York, NY", type: "Residential", status: "Not Complete", pincode: "10004", completed: false },
  //   { id: 5, name: "Building E - Data Center", address: "202 Tech Park, New York, NY", type: "Industrial", status: "Not Complete", pincode: "10005", completed: false },
  // ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const updatedBuildings = products.filter((building) => building.id !== id);
    setProducts(updatedBuildings);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    const updatedBuildings = products.map((building) => {
      if (building.id === id) {
        const isCompleted = !building.completed;
        return {
          ...building,
          completed: isCompleted,
          status: isCompleted ? "Complete" : "Not Complete",
        };
      }
      return building;
    });
    setProducts(updatedBuildings);
  };

  const filteredBuildings = products.filter((building) =>{
    const uploaderName = building.uploadername?.toLowerCase() || "";
  const address = building.address?.toLowerCase() || "";
  const buildingType = building.building?.toLowerCase() || "";
  const status = building.status?.toLowerCase() || "";
  const pincode = building.pincode?.toString() || "";

  const search = searchTerm.toLowerCase();

  return (
    uploaderName.includes(search) ||
    address.includes(search) ||
    buildingType.includes(search) ||
    status.includes(search) ||
    pincode.includes(search)
  );
});

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
        <button className="btn btn-dark">+ Add Building</button>
      </div>

      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th></th> 
            <th>Building</th>
            <th>Type</th>
            <th>Status</th>
            <th>Pincode</th>
            <th>PDF</th>
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
                  <small>{building.address}</small>
                </td>
                <td>{building.building}</td>
                <td>
                  {building.status === "Complete" ? (
                    <span className="badge rounded-pill bg-success">{building.status}</span>
                  ) : (
                    <span className="badge rounded-pill bg-danger">{building.status}</span>
                  )}
                </td>
                <td>{building.pincode}</td>
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
    </div>
  );
};

export default Building;


import React, { useState, useRef, useEffect } from "react";
import Building from "./Building";
import Overview from "./Overview";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Adminpage = () => {

  const location = useLocation();
  const {username,useremail} = location.state || {} ;
  
  const [visible, setVisible] = useState(false);
  const [activeView, setActiveView] = useState("building");
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const toggleSidebar = () => setVisible(!visible);

  const rowButton = [
    { head: "Overview", move: "overview" },
    { head: "Buildings", move: "building" },
    { head: "Documents", move: "document" },
    { head: "Alerts", move: "alerts" },
    { head: "Users", move: "users" },
  ];

  const [form, setForm] = useState({
    adminname: "",
    email: "",
    phonenumber: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const modalRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/project/adminsignup", form);
      setMessage("Admin registered successfully");
      console.log(response);
      
      window.bootstrap.Modal.getInstance(modalRef.current)?.hide();
    } catch (error) {
      console.log(error);
      
      setMessage(error.response?.data || "Signup failed");
    }
  };

  // Auto-initialize modal on mount
  useEffect(() => {
    if (modalRef.current) {
      new window.bootstrap.Modal(modalRef.current);
    }
  }, []);

  const openModal = () => {
    window.bootstrap.Modal.getOrCreateInstance(modalRef.current).show();
  };


  return (
    <>
      <header className="backgroundColour p-2 border">
  <div className="d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      <button
        className="btn btn-outline-danger d-block d-md-none me-2"
        onClick={toggleSidebar}
      >
        <i className="bi bi-list fs-5"></i>
      </button>
      <i className="fa-solid fa-fire-extinguisher p-1 ms-1 text-light fs-5"></i>
      <h4 className="fw-bold text-dark ms-2 mb-0">FireGuard</h4>
    </div>

    <div className="d-flex align-items-center">
      <button className="btn btn-sm btn-outline-light rounded-circle me-2 position-relative">
        <i className="bi bi-bell"></i>
        <span className="badge position-absolute top-0 start-100 translate-middle bg-danger rounded-circle">
          10
        </span>
      </button>

      <div className="rounded-circle bg-light text-dark d-flex align-items-center justify-content-center me-2" style={{ width: "30px", height: "30px" }}>
        J
      </div>

      <div className="d-flex flex-column">
        <strong className="text-dark">{username}</strong>
        <small className="text-muted">{useremail}</small>
      </div>
    </div>
  </div>
</header>


      <div className="d-flex">
        <div
          id="sidebar"
          className={`bg-light border-end p-3 ${
            visible ? "" : "d-none"
          } d-md-flex flex-column`}
          style={{ width: "250px", minHeight: "100vh" }}
        >
          <h6 className="fw-bold">Dashboard</h6>
          <p>Fire monitoring system</p>

          <ul className="list-group mb-4">
            <li className="list-group-item-action p-2">
              <i className="bi bi-bar-chart me-2"></i>Dashboard
            </li>
            {[
              { icon: "building", label: "Buildings" },
              { icon: "file-earmark-check", label: "Documents" },
              { icon: "exclamation-triangle", label: "Alerts" },
              { icon: "people", label: "Users" },
            ].map(({ icon, label }) => (
              <li
                key={label}
                className="list-group-item-action p-2 d-flex justify-content-between align-items-center"
              >
                <span>
                  <i className={`bi bi-${icon} me-2`}></i>
                  {label}
                </span>
                <span className="badge bg-danger">5</span>
              </li>
            ))}
          </ul>

          <ul className="list-group mb-4">
            <li className="list-group-item-action p-2">
              <i className="bi bi-gear me-2"></i>Settings
            </li>
            <li className="list-group-item-action p-2">
              <i className="bi bi-question-octagon me-2"></i>Help & Support
            </li>
          </ul>

          <div className="mt-auto">
            <span className="ms-2">
              <i className="bi bi-box-arrow-right me-2"></i>Logout
            </span>
          </div>
        </div>

        <div className="flex-grow-1 bg-light min-vh-100 p-3">
          <div className="d-flex justify-content-between align-items-start flex-wrap">
            <div>
              <h3 className="fw-bold">Admin Dashboard</h3>
              <p>Monitor and manage your fire safety system</p>
            </div>
            <div className="d-flex align-items-start">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-outline-danger dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  + New
                </button>
                <ul className="dropdown-menu">
                  <li><h6 className="ms-2">Create New</h6></li>
                  <li onClick={toggleModal}>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-building me-2"></i>Add Building
                    </a>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={openModal}><i className="bi bi-people me-2"></i>Add Admin</button>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-exclamation-triangle me-2"></i>Create Alert
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="btn-group mt-3 d-flex flex-wrap">
            {rowButton.map(({ head, move }) => (
              <button
                key={move}
                className={`btn btn-outline-warning m-1 ${
                  activeView === move ? "bg-dark text-light" : ""
                }`}
                onClick={() => setActiveView(move)}
              >
                {head}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {activeView === "building" && <Building />}
            {activeView === "overview" && <Overview />}
            {activeView === "overview" && <Overview />}
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal show fade d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Building</h5>
                  <button type="button" className="btn-close" onClick={toggleModal}></button>
                </div>
                <div className="modal-body">
                  <form>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline-dark" onClick={toggleModal}>Cancel</button>
                  <button className="btn btn-dark">Add Building</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

<div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Admin Signup</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="fw-bold mb-1">Firstname</label>
                  <input
                    type="text"
                    className="form-control"
                    name="adminname"
                    value={form.adminname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="fw-bold mb-1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="fw-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phonenumber"
                    value={form.phonenumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="fw-bold mb-1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <input type="hidden" name="role" value="ADMIN" />

                <button type="submit" className="btn btn-dark w-100 mt-3">
                  Add Admin
                </button>
              </form>

              {message && <p className="text-danger mt-2">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Adminpage;

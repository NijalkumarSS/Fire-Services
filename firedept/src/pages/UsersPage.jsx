import React from "react";
import { useState } from "react";
import UserContent from "../components/UserContent";
import UploadContent from "../components/UploadContent";
import LicenseUpload from "../components/LicenseUpload";
import { logout } from "../components/logout";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {

  const navigate = useNavigate()
  const [activeView, setActiveView] = useState("requirements");
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  
  const navItems = [
    { icon: "menu-down", label: "Description", move: "requirements" },
    { icon: "file-earmark-check", label: "Upload", move: "upload" },
    {
      icon: "exclamation-triangle",
      label: "Notification",
      move: "notification",
    },
    { icon: "menu-up", label: "Summary", move: "summary" },
    { icon: "people", label: "Users", move: "user" },
  ];

  // const logoutFunc = () => {
  //   logout();
  //   const storedEmail = localStorage.getItem('GetEmail')
  //   if(storedEmail === null){
  //     navigate('/')
  //   }
  //   else{
  //     navigate('/userspage')
  //   }
  // } 

  return (
    <>
      <div
        className="d-flex align-items-center text-white"
        style={{
          minHeight: "250px",
          background: "linear-gradient(to bottom, #e52d27, #b31217)",
          padding: "40px 20px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-12">
              <h1 className="fw-bold display-4" style={{fontFamily:'Times New Roman'}}>
                NOC <span className="text-warning">&</span>  Fire Safety Document Submission
              </h1>
              <p className="lead mt-3">
                Welcome to the Fire Department Document Submission Portal ,
                track, and manage your fire safety documents with ease.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row g-0">
          <div
            id="sidebar"
            className="
            col-12 col-md-3 col-lg-2
             d-md-flex flex-column
            p-3 vh-100% border
          "
          >
            <h4 className="fw-bold ms-2">Dashboard</h4>
            <p className="ms-2 text-muted">Fire monitoring system</p>

            <ul className="list-group list-group-flush">
              {navItems.map(({ icon, label, move }) => (
                <button
                  key={move}
                  className={`
                  btn w-100 text-start d-flex justify-content-between align-items-center
                  mb-1
                  ${activeView === move ? "btn-dark" : ""}
                `}
                  onClick={() => setActiveView(move)}
                >
                  <span>
                    <i className={`bi bi-${icon} me-2`}></i>
                    {label}
                  </span>
                </button>
              ))}
            </ul>

            <ul className="list-group list-group-flush mt-4">
              <li className="list-group-item-action p-2" type="none">
                <i className="bi bi-gear me-2"></i>Settings
              </li>
              <li className="list-group-item-action p-2" type="none">
                <i className="bi bi-question-octagon me-2"></i>Help &amp;
                Support
              </li>
            </ul>

            <div className="mt-auto">
            <button className="btn text-danger" onClick={() => setShowLogoutModal(true)}>
              <i className="bi bi-box-arrow-right me-2"></i>Logout
            </button>
            </div>
          </div>
          <div className="col-lg-10 ">
            {activeView === "notification" && (
              <div>
                <h2>Notifications</h2>
                <p>…your notification list here…</p>
              </div>
            )}

            {activeView === "user" && (
              <div>
                <h2>Users</h2>
                <p>…your users management view here…</p>
              </div>
            )}
            {activeView === "summary" && <UserContent/>}
            {activeView === 'upload' &&  <LicenseUpload/>}
            {activeView === 'requirements' &&  <UploadContent/>}
           
          </div>
          
        </div>
      </div>


      

            {showLogoutModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLogoutModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowLogoutModal(false)}
                >
                  No
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setShowLogoutModal(false);
                    logout();
                    const storedEmail = localStorage.getItem("GetEmail");
                    if (storedEmail === null) {
                      navigate("/");
                    } else {
                      navigate("/userspage");
                    }
                  }}
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default UsersPage;

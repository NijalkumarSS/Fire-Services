// import React from "react";
// import { useState } from "react";
// import Building from "./Building";
// import Overview from "./Overview";

// const Adminpage = () => {
//   const [visible, setvisible] = useState(false);
  
//   const [activeview,setactiveview] =useState('building');

//   const [rowbutton,setrowbutton] = useState([
//     {head:'Overview', move:'overview'},
//     {head:'Buildings', move:'building'},
//     {head:'Documents', move:'document'},
//     {head:'Alerts', move:'alerts'},
//     {head:'Users',move:'users'}
//   ])

//   const [showModal, setShowModal] = useState(false);

//   const toggleModal = () => setShowModal(!showModal);

//   const toggleSidebar = () => {
//     setvisible(!visible);
//     console.log(visible);
//   };

//   return (
//     <>
//       <header className=" backgroundColour p-2 border">
//         <div className="row">
//           <div className="col col-8 d-flex justify-content-start ">
//             <button
//               className="btn btn-outline-danger d-block d-md-none"
//               onClick={toggleSidebar}
//             >
//               <i className="bi bi-list fs-5 "></i>
//             </button>
//             <i className="fa-solid fa-fire-extinguisher p-1 ms-1 mt-2 text-light fs-5"></i>
//             <h4 className="fw-bold mt-2 text-dark">FireGuard</h4>
//           </div>
//           <div className="col col-lg-4 d-flex justify-content-end ">
//             <button
//               className="btn btn-sm btn-outline-light rounded m-1 me-2 position-relative"
//               style={{ fontSize: "14px", padding: "5px 10px" }}
//             >
//               <i className="bi bi-bell"></i>
//               <span className="badge position-absolute translate-middle bg-danger rounded-circle">
//                 10
//               </span>
//             </button>
//             <button className="rounded-circle p-3 m-1 border-danger"></button>
//           </div>
//         </div>  
//       </header>
//       <div className="container-fluid">
//         <div className="row">
   
//     <div
//       id="sidebar"
//       className={`col-12 col-md-3 col-lg-2 bg-light ${
//         visible ? `` : "d-none"
//       } d-md-flex flex-column p-3 vh-100 z-3 border`}
//     >
//       <h6 className="fw-bold ms-2">Dashboard</h6>
//       <p className="ms-2">Fire monitoring system</p>
//       <ul className="list-group bg-light">
   
//         <li className="list-group-item-action p-2">
//           <i className="bi bi-bar-chart me-2"></i>Dashboard
//         </li>
       
//         {[
//           { icon: "building", label: "Buildings" },
//           { icon: "file-earmark-check", label: "Documents" },
//           { icon: "exclamation-triangle", label: "Alerts" },
//           { icon: "people", label: "Users" },
//         ].map(({ icon, label }) => (
//           <li
//             key={label}
//             className="list-group-item-action p-2 d-flex justify-content-between align-items-center"
//           >
//             <span>
//               <i className={`bi bi-${icon} me-2`}></i>
//               {label}
//             </span>
//             <span className="badge bg-danger">5</span>
//           </li>
//         ))}
//       </ul>

//       <ul className="list-group mt-4">
//         <li className="list-group-item-action p-2">
//           <i className="bi bi-gear me-2"></i>Settings
//         </li>
//         <li className="list-group-item-action p-2">
//           <i className="bi bi-question-octagon me-2"></i>Help & Support
//         </li>
//       </ul>

//       <div>
//         <span className="ms-2">
//           <i className="bi bi-box-arrow-right me-2"></i>Logout
//         </span>
//       </div>
//     </div>

//     <div className="col bg-light min-vh-100">
//       <div className="mt-4 px-3 d-flex flex-wrap justify-content-between">
//         <div>
//           <h3 className="fw-bold">Admin Dashboard</h3>
//           <p className="  ">Monitor and manage your fire safety system</p>
//         </div>
//         <div className="d-flex align-items-start">
//           <button
//             className="btn btn-sm btn-outline-danger rounded position-relative me-2"
//             style={{ fontSize: "14px", padding: "5px 10px" }}
//           >
//             <i className="bi bi-bell"></i>
//             <span className="badge position-absolute top-0 start-100 translate-middle bg-danger rounded-circle">
//               10
//             </span>
//           </button>
//           <div className="dropdown">
//             <button
//               className="btn btn-sm btn-outline-danger  dropdown-toggle"
//               type="button"
//               data-bs-toggle="dropdown"
//             >
//               + New User
//             </button>
//             <ul className="dropdown-menu">
//               <li><h6 className="ms-1">Create new</h6></li>
//               <li onClick={toggleModal}>
//                 <a className="dropdown-item" href="#">
//                   <i className="bi bi-building me-1"></i>Add Building
//                 </a>
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#">
//                   <i className="bi bi-people me-1"></i>Add User
//                 </a>
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#">

                  
//                   <i className="bi bi-exclamation-triangle me-1"></i>Create Alert
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>


//       <div className="btn-group mt-3 p-2 bg-light d-flex flex-wrap">
//         {rowbutton.map(({head,move}) => (
//           <button
//             key={move}
//             className={`btn bg-light border-white btn-outline-warning  ${activeview === move ? 'bg-dark text-light':''}`}

//             onClick={() => setactiveview(move)}
//           >
//             {head}
//           </button>
//         ))}
//       </div>

   
//       {/* <div className="col-lg-12">
//         {activeview === 'building' && <Building/> }
//         {activeview === 'overview' && <Overview/> }
//       </div> */}
//     </div>
//   </div>
// </div>
 

//       {showModal && (
//         <div className="modal show fade d-block" tabIndex="-1" role="dialog">
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title fw-bold">Add New Building</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={toggleModal}
//                 ></button>
//               </div>

//               <div className="modal-body">
//                 <p>
//                   Enter the details for the new building to add to the system.
//                 </p>
//                 <form>
//                   <div className="mb-3">
//                     <label className="form-label">Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Building name"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Type</label>
//                     <select className="form-select">
//                       <option>Select building type</option>
//                       <option>Residential</option>
//                       <option>Commercial</option>
//                       <option>Industrial</option>
//                     </select>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Address</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Street address"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">City</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="City"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">State</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="State"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">ZIP Code</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="ZIP Code"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Notes</label>
//                     <textarea
//                       className="form-control"
//                       placeholder="Additional information about the building"
//                       rows="3"
//                     ></textarea>
//                   </div>
//                 </form>
//               </div>

//               <div className="modal-footer">
//                 <button className="btn btn-outline-dark" onClick={toggleModal}>
//                   Cancel
//                 </button>
//                 <button className="btn btn-dark">Add Building</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {showModal && <div className="modal-backdrop fade show"></div>}
//     </>
//   );
// };
// export default Adminpage;

import React, { useState } from "react";
import Building from "./Building";
import Overview from "./Overview";

const Adminpage = () => {
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
            <button className="rounded-circle p-2 m-1 border border-danger"></button>
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
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-people me-2"></i>Add User
                    </a>
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
    </>
  );
};

export default Adminpage;

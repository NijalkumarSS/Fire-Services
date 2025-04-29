import React from 'react'

const Overview = () => {
  return (
    <>
    <div className='container-fluid'>
       <div className="row mt-3 g-4 px-2">
        
        {[
          {
            title: "Total Buildings",
            value: 24,
            note: "+2 from last month",
            icon: "building",
            noteColor: "text-success",
          },
          {
            title: "Pending Documents",
            value: 12,
            note: "+2 from last week",
            icon: "file-earmark-check",
            noteColor: "text-success",
          },
          {
            title: "Active Alerts",
            value: 5,
            note: "+2 from yesterday",
            icon: "exclamation-triangle",
            noteColor: "text-success",
          },
          {
            title: "System Status",
            value: "Operational",
            note: "All system normal",
            icon: "check-circle",
            noteColor: "text-light",
          },
        ].map(({ title, value, note, icon, noteColor }) => (
          <div className="col-12 col-sm-6 col-lg-3" key={title}>
            <div className="card h-100 d-flex flex-row justify-content-between align-items-center p-2">
              <div className="card-body">
                <p className="mb-1" style={{ fontSize: "14px" }}>{title}</p>
                <h4 className="fw-bold">{value}</h4>
                <p className={`${noteColor} mb-0`} style={{ fontSize: "10px" }}>{note}</p>
              </div>
              <div className="fs-2 text-secondary pe-3">
                <i className={`bi bi-${icon}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

    </>
  )
}

export default Overview
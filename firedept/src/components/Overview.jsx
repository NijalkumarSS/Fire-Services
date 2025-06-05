import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VerifyOTP from './VerifyOTP';

const Overview = () => {

  const [count ,setCount] = useState();
  const [falsecount, setFalsecount] = useState();

  useEffect(() => {
    axios.get("http://localhost:8080/project/count")
    .then(response => {
            setCount(response.data.count)
            setFalsecount(response.data.falsecount)
    })
    .catch(error => {
      console.log(error);
    }
    )
  })
  return (
    <>
    <div className='container-fluid'>
       <div className="row mt-3 g-4 px-2">
        
        {[
          {
            title: "Total Buildings",
            value:`${count}`,
            note: "+2 from last month",
            icon: "building",
            noteColor: "text-success",
          },
          {
            title: "Pending Documents",
            value:`${falsecount}`,
            note: "+2 from last week",
            icon: "file-earmark-check",
            noteColor: "text-success",
          },
          {
            title: "Approved",
            value: 0, 
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
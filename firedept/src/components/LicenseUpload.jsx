import React from 'react'
import { Link } from 'react-router-dom';    
import { useNavigate } from 'react-router-dom';

const LicenseUpload = ({username,useremail}) => {

  const navigate = useNavigate();
  console.log(useremail);

  const handlesubmit = () => {
    navigate("/uploaddocument",{
      state: {
        username:username,
        useremail: useremail,
      }})
  }

  
  return (
    <>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-12'>
        <header className="bg-white border-bottom shadow-sm py-4">
          <div className="container text-center">
            <h1 className="fw-bold textstyle" style={{ fontSize: '2rem', color: '#333' }}>
              Upload Documents
            </h1>
            <p className="text-muted mt-2" style={{ fontSize: '1rem' }}>
              Upload your documents to get NOC/License
            </p>
          </div>
        </header>
        <div className='ms-5 mt-4 me-5'>
          <h4 className='mb-4'>Documents Required for Fire NOC:</h4>
          <h5>1.Application Form</h5>
          <p className='ms-3'>The first document you’ll need is the Fire NOC Application Form. This form is available from the Chennai Fire Department or their official website. It must be filled out with correct details about your property and its usage.</p>
          
          <h5>2. Property Details</h5>
          <p className='ms-3'>
          <span className='fw-bold'>Property Address:</span> The exact location of the building or establishment. <br />
          <span className='fw-bold'>Type of Property:</span> Specify whether it’s a residential, commercial, industrial, or mixed-use property. <br />
          <span className='fw-bold'>Land Title Documents:</span> Proof of ownership, such as the land title deed or lease agreement, depending on whether you own the property or lease it.
          </p>
          <h5>3. Building Plan Approval</h5>
          <p className='ms-3'>A copy of the approved building plan or layout that has been sanctioned by the local municipal authorities is required. This plan should clearly illustrate fire safety provisions such as emergency exits, fire escape routes, and locations of fire extinguishers and sprinklers.</p>

          <h5>4. Fire Safety System Details</h5>
          <p className='ms-3'>
          You need to provide a comprehensive list of fire safety systems installed in your building. This includes: <br />

          Fire extinguishers <br />
          Fire alarms <br />
          Smoke detectors <br />
          Sprinkler systems <br />
          Emergency lighting systems <br /> 
          Fire exits and staircases <br />
          </p>

          <h5>5. Fire Safety Audit Report</h5>
          <p className='ms-3'>A fire safety audit report from an authorized agency or a fire safety consultant is crucial. The report should outline the current state of fire safety in the building and certify that it complies with all necessary safety regulations.</p>

          <h5>6. Occupancy Certificate</h5>
          <p className='ms-3'>An Occupancy Certificate (OC) is required for newly constructed buildings. This certificate confirms that the building complies with all construction and safety regulations and is ready for occupancy.</p>
        
          <h5>7. Fire Fighting Equipment Installation Certificate</h5>
          <p className='ms-3'>A certificate of installation from a licensed fire safety equipment supplier or contractor is often necessary to prove that all required fire-fighting equipment has been installed properly and is in working condition.</p>
          
          <h5>8. Building Compliance Certificate</h5>
          <p className='ms-3'>The building compliance certificate ensures that the property meets all the guidelines specified by local authorities in terms of structure, fire safety, and accessibility. This document is especially important for newly constructed or renovated buildings.</p>
        
              <div className='text-center mt-5'>
                <marquee behavior="" direction="">To upload your documents click the button</marquee>
                <button className="btn btn-warning btn-sm text-white" onClick={handlesubmit}
                  style={{ borderRadius: '8px', padding: '10px 20px' }}
                >
                  Upload Now
                </button>
              </div>
        </div>
                    <footer className=" py-3 border-top mt-5">
                      
                        <div className="container text-center">
                            <p className="mb-1" style={{ fontSize: '1rem', color: '#666' }}>
                                © 2025 Fire Safety Authority. All rights reserved.
                            </p>
                        </div>
                    </footer>
         </div>
        </div>
      </div>
    </>
  )
}

export default LicenseUpload;
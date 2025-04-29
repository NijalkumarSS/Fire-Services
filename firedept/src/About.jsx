import React from 'react';

const About = () => {


  return (
    <div  className="container-fluid bg-light py-5">
      <div className="row align-items-center">
   
        <div className="col-md-6 px-5">
          <h1 className="fw-bold mb-4">
            About <span className="text-dark">FireGuard</span>
          </h1>
          <p className="text-secondary fs-5 mb-5">
            FireGuard is a leading provider of fire safety monitoring and verification systems,
            dedicated to protecting lives and property through innovative technology solutions.
          </p>

          <div className="d-flex align-items-start mb-4">
            <div className="icon-circle textColour bg-opacity-10 text-danger me-3">
              <i className="bi bi-shield-exclamation fs-4"></i>
            </div>
            <div>
              <h5 className="fw-bold mb-1">Our Mission</h5>
              <p className="text-secondary mb-0">
                To enhance fire safety compliance and emergency preparedness through accessible, reliable,
                and innovative technology solutions.
              </p>
            </div>
          </div>

         
          <div className="d-flex align-items-start mb-4">
            <div className="icon-circle textColour bg-opacity-10 text-danger me-3">
              <i className="bi bi-eye fs-4"></i>
            </div>
            <div>
              <h5 className="fw-bold mb-1">Our Vision</h5>
              <p className="text-secondary mb-0">
                To become the global standard for fire safety management, creating safer environments
                for everyone, everywhere.
              </p>
            </div>
          </div>

          
          <div className="d-flex align-items-start mb-5">
            <div className="icon-circle textColour bg-opacity-10 text-danger me-3">
              <i className="bi bi-heart fs-4"></i>
            </div>
            <div>
              <h5 className="fw-bold mb-1">Our Values</h5>
              <p className="text-secondary mb-0">
                Safety, innovation, reliability, and customer-centricity guide everything we do.
              </p>
            </div>
          </div>

          
          <div className="d-flex gap-3">
            <button className="btn btn-outline-dark px-4 py-2">Learn More</button>
            <button className="btn backgroundColour  text-white px-4 py-2">Contact Us</button>
          </div>
        </div>

        <div className="col-md-6 d-none d-md-block text-center">
          <div className="placeholder-img bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '250px', height: '250px' }}>
            <i className="bi bi-image fs-1 text-secondary"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import React from 'react'

const Footer = () => {
  return (
    <>
    {/* Footer */}
    <footer className="bg-light text-muted pt-5">
        <div className="container py-4">
          <div className="row d-flex">
            {/* Logo and Description */}
            <div className="col-md-6 mb-4">
              <h5 className="text-dark fw-bold">
                <i className="bi bi-fire text-danger"></i> FireGuard
              </h5>
              <p>Advanced fire monitoring and verification <br /> system for your organization.</p>
            </div>

            {/* Company Links */}
            <div className="col-md-2 mb-4 ">
              <h6 className="fw-bold text-dark">Company</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-muted text-decoration-none">About</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Careers</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Contact</a></li>
              </ul>
            </div>

            {/* Products Links */}
            <div className="col-md-2 mb-4  ">
              <h6 className="fw-bold text-dark">Products</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-muted text-decoration-none">Features</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Pricing</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Request Demo</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="col-md-2 mb-4">
              <h6 className="fw-bold text-dark">Legal</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-muted text-decoration-none">Privacy</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="text-center border-top pt-3 mt-3">
            &copy; 2025 FireGuard. All rights reserved.
          </div>
        </div>
      </footer>
    </>
    )
}

export default Footer
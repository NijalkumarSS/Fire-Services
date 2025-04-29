import React from 'react';


const Contact = () => {
  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1 className="fw-bold">Contact Us</h1>
        <p className="text-secondary fs-5">
          Have questions about our fire monitoring system? Get in touch with our team.
        </p>
      </div>

   
      <div className="row g-4">
     
        <div className="col-lg-6">
          <div className="p-4 border rounded-3 bg-white shadow-sm">
            <h4 className="fw-bold mb-2">Send Us a Message</h4>
            <p className="text-secondary mb-4">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">First name</label>
                  <input type="text" className="form-control" placeholder="Enter your first name" />
                </div>
                <div className="col">
                  <label className="form-label">Last name</label>
                  <input type="text" className="form-control" placeholder="Enter your last name" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" placeholder="Enter your phone number" />
              </div>

              <div className="mb-3">
                <label className="form-label">Subject</label>
                <select className="form-select">
                  <option>Select a subject</option>
                  <option>Support</option>
                  <option>Sales Inquiry</option>
                  <option>Technical Help</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <button type="submit" className="btn backgroundColour text-light w-100">
                Send Message
              </button>
            </form>
          </div>
        </div>

    
        <div className="col-lg-6">
          <div className="bg-light rounded-3 mb-4 p-4 d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
            <i className="bi bi-geo-alt fs-1 text-secondary me-2"></i>
            <span className="text-secondary fs-5">Interactive Map</span>
          </div>

          <div className="p-3 border rounded-3 bg-white shadow-sm d-flex mb-3">
            <div className="icon-circle bg-danger bg-opacity-10 text-danger me-3">
              <i className="bi bi-geo-alt-fill fs-4"></i>
            </div>
            <div>
              <h6 className="fw-bold mb-1">Our Headquarters</h6>
              <p className="text-secondary mb-0">123 Fire Safety Street</p>
              <p className="text-secondary mb-0">New York, NY 10001</p>
              <p className="text-secondary mb-0">United States</p>
            </div>
          </div>

         
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="p-3 border rounded-3 bg-white shadow-sm d-flex">
                <div className="icon-circle bg-danger bg-opacity-10 text-danger me-3">
                  <i className="bi bi-telephone-fill fs-4"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Phone</h6>
                  <p className="text-secondary mb-0">Sales: +1 (555) 123–4567</p>
                  <p className="text-secondary mb-0">Support: +1 (555) 987-6543</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 border rounded-3 bg-white shadow-sm d-flex">
                <div className="icon-circle bg-danger bg-opacity-10 text-danger me-3">
                  <i className="bi bi-envelope-fill fs-4"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Email</h6>
                  <p className="text-secondary mb-0">info@fireguard.com</p>
                  <p className="text-secondary mb-0">support@fireguard.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="p-3 border rounded-3 bg-white shadow-sm d-flex">
            <div className="icon-circle bg-danger bg-opacity-10 text-danger me-3">
              <i className="bi bi-clock-fill fs-4"></i>
            </div>
            <div>
              <h6 className="fw-bold mb-1">Business Hours</h6>
              <p className="text-secondary mb-0">Monday - Friday: 9:00 AM – 6:00 PM EST</p>
              <p className="text-secondary mb-0">Saturday: 10:00 AM – 2:00 PM EST</p>
              <p className="text-secondary mb-0">Sunday: Closed</p>
              <p className="text-danger mt-1">24/7 Emergency Technical Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

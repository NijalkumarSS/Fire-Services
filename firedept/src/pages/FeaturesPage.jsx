import React from 'react'
import { Link } from 'react-router-dom';

const FeaturesPage = () => {

    const iconBoxStyle = {
        backgroundColor: "#fdeaea",
        borderRadius: "10px",
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
      };
    
      const cardStyle = {
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        backgroundColor: "#fff",
      };
    
      const checkIcon = <i className="bi bi-check-circle-fill text-success me-2"></i>;
  return (
    <>
     <div
      className="d-flex align-items-center text-white"
      style={{
        minHeight: "300px",
        background: "linear-gradient(to bottom, #e52d27, #b31217)",
        padding: "40px 20px",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-md-12">
            <h1 className="fw-bold display-4">
              Comprehensive Fire Safety Features
            </h1>
            <p className="lead mt-3">
              Our fire monitoring system provides industry-leading features to
              ensure your buildings remain safe and compliant with all
              regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container " style={{marginTop : "60px"}}>
      <div className="text-center mb-5">
        <h1 className="fw-bold">
          Powerful Features for Complete Fire Safety Management
        </h1>
        <p className="text-muted">
          Discover how our platform helps you maintain compliance and ensure safety
        </p>
      </div>

      <div className="row g-4">
      
        <div className="col-md-4">
          <div style={cardStyle}>
            <div style={iconBoxStyle}>
              <i className="bi bi-file-earmark-text-fill fs-5 text-danger"></i>
            </div>
            <h5 className="fw-bold">Document Management</h5>
            <p className="text-muted">Centralized storage for all fire safety documentation</p>
            <ul className="list-unstyled">
              <li>{checkIcon}Automatic document expiry notifications</li>
              <li>{checkIcon}Secure cloud storage with backup</li>
              <li>{checkIcon}Quick retrieval during inspections</li>
              <li>{checkIcon}Document version history</li>
            </ul>
          </div>
        </div>


        <div className="col-md-4">
          <div style={cardStyle}>
            <div style={iconBoxStyle}>
              <i className="bi bi-bell-fill fs-5 text-danger"></i>
            </div>
            <h5 className="fw-bold">Alert System</h5>
            <p className="text-muted">Real-time alerts for critical safety issues</p>
            <ul className="list-unstyled">
              <li>{checkIcon}Instant notifications for compliance issues</li>
              <li>{checkIcon}Customizable alert thresholds</li>
              <li>{checkIcon}Multi-channel alerts (email, SMS, app)</li>
              <li>{checkIcon}Escalation workflows</li>
            </ul>
          </div>
        </div>

   
        <div className="col-md-4">
          <div style={cardStyle}>
            <div style={iconBoxStyle}>
              <i className="bi bi-shield-lock-fill fs-5 text-danger"></i>
            </div>
            <h5 className="fw-bold">Compliance Tracking</h5>
            <p className="text-muted">Monitor and maintain regulatory compliance</p>
            <ul className="list-unstyled">
              <li>{checkIcon}Automated compliance status updates</li>
              <li>{checkIcon}Regulation change notifications</li>
              <li>{checkIcon}Compliance risk assessment</li>
              <li>{checkIcon}Audit-ready reporting</li>
            </ul>
          </div>
        </div>

       
        <div className="col-md-4">
          <div style={cardStyle}>
            <div style={iconBoxStyle}>
              <i className="bi bi-bar-chart-line-fill fs-5 text-danger"></i>
            </div>
            <h5 className="fw-bold">Analytics Dashboard</h5>
            <p className="text-muted">Comprehensive insights into safety performance</p>
            <ul className="list-unstyled">
              <li>{checkIcon}Real-time compliance metrics</li>
              <li>{checkIcon}Historical trend analysis</li>
              <li>{checkIcon}Custom report generation</li>
              <li>{checkIcon}Benchmark comparisons</li>
            </ul>
          </div>
        </div>

        
        <div className="col-md-4">
          <div style={cardStyle}>
            <div style={iconBoxStyle}>
              <i className="bi bi-people-fill fs-5 text-danger"></i>
            </div>
            <h5 className="fw-bold">User Management</h5>
            <p className="text-muted">Role-based access control for team members</p>
            <ul className="list-unstyled">
              <li>{checkIcon}Customizable permission levels</li>
              <li>{checkIcon}Activity logging and auditing</li>
              <li>{checkIcon}Team collaboration tools</li>
              <li>{checkIcon}Secure authentication</li>
            </ul>
          </div>
        </div>

       
        <div className="col-md-4">
          <div style={cardStyle}>
            <div style={iconBoxStyle}>
              <i className="bi bi-building-fill fs-5 text-danger"></i>
            </div>
            <h5 className="fw-bold">Building Management</h5>
            <p className="text-muted">Manage multiple properties from one platform</p>
            <ul className="list-unstyled">
              <li>{checkIcon}Hierarchical building organization</li>
              <li>{checkIcon}Floor plan integration</li>
              <li>{checkIcon}Equipment tracking and maintenance</li>
              <li>{checkIcon}Occupancy monitoring</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mb-4 mt-5">
        <h2 className="fw-bold">Feature Comparison</h2>
        <p className="text-muted">
          See how our features compare to traditional fire safety management
        </p>
      </div>

      <div className="table-responsive mb-5">
        <table className="table table-bordered align-middle">
          <thead className="table-light p-2">
            <tr>
              <th className="text-uppercase small">Feature</th>
              <th className="text-uppercase small">Our Platform</th>
              <th className="text-uppercase small">Traditional Methods</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Document Management</strong></td>
              <td>{checkIcon}Centralized cloud storage with automatic expiry notifications</td>
              <td>Physical storage requiring manual tracking</td>
            </tr>
            <tr>
              <td><strong>Real-time Alerts</strong></td>
              <td>{checkIcon}Instant notifications across multiple channels</td>
              <td className="text-danger">Not available</td>
            </tr>
            <tr>
              <td><strong>Compliance Tracking</strong></td>
              <td>{checkIcon}Automated tracking with regulatory updates</td>
              <td>Manual spreadsheets requiring constant updates</td>
            </tr>
            <tr>
              <td><strong>Analytics & Reporting</strong></td>
              <td>{checkIcon}Comprehensive dashboards with custom reports</td>
              <td>Basic reporting with limited insights</td>
            </tr>
            <tr>
              <td><strong>Mobile Access</strong></td>
              <td>{checkIcon}Full functionality on mobile devices</td>
              <td className="text-danger">Not available</td>
            </tr>
            <tr>
              <td><strong>Multi-building Management</strong></td>
              <td>{checkIcon}Unlimited buildings with hierarchical organization</td>
              <td>Separate systems for each building</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="backgroundColour text-white text-center py-5 mt-4">
      <div className="container">
        <h1 className="fw-bold mb-3">
          Ready to enhance your fire safety management?
        </h1>
        <p className="fs-5 mb-4">
          Join thousands of buildings that trust our platform for their fire safety
          compliance needs.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/login">
          <button className="btn btn-light fw-semibold px-4 py-2">
            Get Started
          </button>
          </Link>
          <Link to="/contact">
          <button className="btn btn-outline-light fw-semibold px-4 py-2">
            Contact Us
          </button></Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default FeaturesPage
import React, { useState } from 'react';
import FeaturesBox from './FeaturesBox';

function Features() {
  const [iconBox, setIconBox] = useState([
    {
      icon:"bi bi-bell textColour fs-1 mb-3 d-block",
      name:'Instant Alerts',
      Text:'Receive instant alerts and notifications for any fire safety issues or emergencies.'
    },
    {
      icon:'bi bi-shield-fill textColour fs-1 mb-3 d-block',
      name:"Real-time Monitoring",
      Text:"Monitor fire safety systems in real-time with instant status updates and notifications."

    },
    {
      icon:'bi bi-file-earmark-check textColour fs-1 mb-3 d-block',
      name:'Document Verification',
      Text:"Verify and manage all fire safety documentation with our advanced verification system."
    },
    {
      icon: "bi bi-bar-chart textColour fs-1 mb-3 d-block",
      name: "Compliance Reporting",
      Text: "Generate comprehensive compliance reports for regulatory requirements and internal audits.",
    },
    {
      icon: "bi bi-people textColour fs-1 mb-3 d-block",
      name: "User Management",
      Text: "Manage user roles, permissions, and access to ensure data security and integrity.",
      },
    {
      icon: "bi bi-building textColour fs-1 mb-3 d-block",
      name: "Multi-Building Support",
      Text: "Manage user access and permissions across multiple buildings and locations.",
    }
  ]);

  return (
    <>
      <section className="py-5 text-center">
        <h2 className="fw-bold mb-3 display-6">Key Features</h2>
        <p className="text-muted mb-5">
          Our system provides comprehensive fire safety management tools for your organization
        </p>

        <div className="container">
   
          <div className="row g-4 justify-content-center mt-4">
            {iconBox.map((item, index) => (
              <div className="col-md-4" key={index}>
                <FeaturesBox item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;

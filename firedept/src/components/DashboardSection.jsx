import React from 'react';
const DashboardSection = ({ role }) => {
  const roleSections = {
    overview: [
      { label: "Admin Dashboard", body: "Monitor and manage your fire safety system" },
    ],
    building: [
      { label: "Building Management", body: "Monitor and manage building for fire safety system" },
    ],
    document: [
      { label: "Document Management", body: "Manage and track documents for fire safety system" },
    ],
    notification: [
      { label: "Notification Management", body: "Manage and track notifications for fire safety system" },
    ],
  };

  const content = roleSections[role] || [];

  return (
    <div>
      {content.length === 0 ? (
        <p className="text-muted">No section available for role: {role}</p>
      ) : (
        content.map((item, index) => (
          <div key={index} className="mb-3">
            <h3 className="fw-bold">{item.label}</h3>
            <p>{item.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DashboardSection;

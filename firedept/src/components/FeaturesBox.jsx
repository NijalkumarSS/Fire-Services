import React from 'react';

const FeaturesBox = ({ item }) => {
  return (
    <div className="border rounded p-4 h-100 shadow-sm">
      <i className={item.icon}></i>
      <h5 className="fw-bold">{item.name}</h5>
      <p className="text-muted">{item.Text}</p>
    </div>
  );
};

export default FeaturesBox;

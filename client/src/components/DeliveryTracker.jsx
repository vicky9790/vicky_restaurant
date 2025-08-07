import React from "react";
import "./DeliveryTracker.css";

const statusSteps = [
  { icon: "🛒", label: "Order Placed" },
  { icon: "👨‍🍳", label: "Preparing" },
  { icon: "🚚", label: "Out for Delivery" },
  { icon: "📍", label: "Delivered" }
];

const DeliveryTracker = ({ currentStatus }) => {
  const getStatusIndex = () =>
    statusSteps.findIndex(step => step.label === currentStatus);

  return (
    <div className="delivery-tracker">
      {statusSteps.map((step, index) => (
        <div
          key={index}
          className={`tracker-step ${
            index <= getStatusIndex() ? "active" : ""
          }`}
        >
          <div className="tracker-icon">{step.icon}</div>
          <div className="tracker-label">{step.label}</div>
          {index < statusSteps.length - 1 && (
            <div className="tracker-line"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeliveryTracker;

import React from "react";

const Campaign = props => {
  function orgSwitch(org) {
    switch (org) {
      case 1:
        return "African Wildlife Foundation";
      case 2:
        return "Clearwater Marine Foundation";
      case 3:
        return "African Animals Rescue";
      case 4:
        return "Kanya Animals House";
      default:
        return null;
    }
  }
  return (
    <div className="campaign-card">
      <img
        className="campaign-img"
        src={props.campaign.image_url}
        alt={props.campaign.species}
      />
      <div className="campaign-info">
        <h2>{props.campaign.title}</h2>
        <h3 className="org-name">
          {orgSwitch(props.campaign.organization_id)}
        </h3>
        <h3>Location: {props.campaign.location}</h3>
        <h3>Species: {props.campaign.species}</h3>
        <h3>Urgency: {props.campaign.urgency}</h3>
        <h3>Funding Recieved: ${props.campaign.funding_received}</h3>
      </div>
    </div>
  );
};

export default Campaign;

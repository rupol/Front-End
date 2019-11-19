import React from "react";

const Campaign = props => {
  return (
    <div className="campaign-card">
      <h2>{props.campaign.title}</h2>
      <h3>Location: {props.campaign.location}</h3>
      <h3>Species: {props.campaign.species}</h3>
      <h3>Urgency: {props.campaign.urgency}</h3>
    </div>
  );
};

export default Campaign;

import React from "react";

const OrgCampaign = props => {
  return (
    <div className="campaign-card">
      <h2>{props.campaign.title}</h2>
      <h3>Location: {props.campaign.location}</h3>
      <h3>Species: {props.campaign.species}</h3>
      <h3>Urgency: {props.campaign.urgency}</h3>
      <div className="campaign-buttons">
        <button
          onClick={props.handleEdit}
          value={props.campaign.campaigns_id}
          className="fas fa-edit fa-xlg edit-button"
        ></button>
        <button
          onClick={props.handleDelete}
          value={props.campaign.campaigns_id}
          className="fas fa-trash fa-xlg delete-button"
        ></button>
      </div>
    </div>
  );
};

export default OrgCampaign;

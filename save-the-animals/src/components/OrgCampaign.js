import React from "react";
import { Link } from "react-router-dom";

const OrgCampaign = props => {
  return (
    <div className="campaign-card">
      <h2>{props.campaign.title}</h2>
      <h3>Location: {props.campaign.location}</h3>
      <h3>Species: {props.campaign.species}</h3>
      <h3>Urgency: {props.campaign.urgency}</h3>
      <div className="campaign-buttons">
        <Link
          className="fas fa-edit fa-xlg edit-button"
          to={`/org-campaigns/${props.campaign.campaigns_id}`}
        ></Link>
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

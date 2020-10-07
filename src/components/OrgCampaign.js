import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const OrgCampaign = (props) => {
  return (
    <div className="campaign-card">
      <img
        className="campaign-img"
        src={props.campaign.photo_url}
        alt={props.campaign.species}
      />
      <div className="campaign-info">
        <h2>{props.campaign.title}</h2>
        <p>{props.campaign.description}</p>
        <h3>Location: {props.campaign.location}</h3>
        <h3>Species: {props.campaign.species}</h3>
        <h3>Urgency: {props.campaign.urgency_level}</h3>
        <h3>Funding Goal: ${props.campaign.funding_goal}</h3>
        <h3>
          Deadline:{" "}
          <Moment format="MMM D YYYY">{props.campaign.deadline}</Moment>
        </h3>
      </div>

      <div className="campaign-buttons">
        <Link
          className="fas fa-edit fa-xlg btn edit-button"
          to={`/org-campaigns/${props.campaign.id}`}
        ></Link>
        <button
          onClick={props.handleDelete}
          value={props.campaign.id}
          className="fas fa-trash fa-xlg btn delete-button"
        ></button>
      </div>
    </div>
  );
};

export default OrgCampaign;

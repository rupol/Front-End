import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import OrgCampaign from "./OrgCampaign";

import { getOrgCampaigns, deleteCampaign } from "../actions/action";

function OrgCampaigns(props) {
  useEffect(() => {
    props.getOrgCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = event => {
    event.preventDefault();
    props.deleteCampaign(event.target.value);
  };

  return (
    <div className="main-section">
      <h1>My Campaigns</h1>
      {props.campaigns.length ? (
        <div>
          {props.campaigns.map(campaign => (
            <OrgCampaign
              key={campaign.campaigns_id}
              campaign={campaign}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <h2>
          <NavLink exact to="/new-campaign">
            Add a campaign
          </NavLink>{" "}
        </h2>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    campaigns: state.campaigns
  };
};

export default connect(mapStateToProps, { getOrgCampaigns, deleteCampaign })(
  OrgCampaigns
);

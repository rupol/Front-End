import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import api from "../utils/api";

import OrgCampaign from "./OrgCampaign";

function OrgCampaigns(props) {
  const [campaigns, setCampaigns] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api()
      .get("/campaigns/organizations")
      .then(res => {
        setCampaigns(res.data.campaigns);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleDelete = event => {
    event.preventDefault();
    setIsLoading(true);
    api()
      .delete(`/campaigns/${event.target.value}`)
      .then(res => {
        api()
          .get("/campaigns/organizations")
          .then(res => {
            setCampaigns(res.data.campaigns);
            setIsLoading(false);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="main-section">
      <h1>My Campaigns</h1>
      {!isLoading && campaigns.length ? (
        <div>
          {campaigns.map(campaign => (
            <OrgCampaign
              key={campaign.campaigns_id}
              campaign={campaign}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      ) : !isLoading && !campaigns.length ? (
        <h2>
          <NavLink exact to="/new-campaign">
            Add a campaign
          </NavLink>{" "}
        </h2>
      ) : (
        <div>
          <h2>...loading campaigns...</h2>
        </div>
      )}
    </div>
  );
}

export default OrgCampaigns;

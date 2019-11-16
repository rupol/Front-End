import React, { useState, useEffect } from "react";
import api from "../utils/api";

import Campaign from "./Campaign";

function AllCampaigns(props) {
  const [campaigns, setCampaigns] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api()
      .get("/campaigns/supporters")
      .then(res => {
        console.log(res);
        setCampaigns(res.data.campaigns);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="main-section">
      <h1>Current Campaigns</h1>
      {!isLoading && campaigns.length ? (
        <div>
          {campaigns.map(campaign => (
            <Campaign key={campaign.campaigns_id} campaign={campaign} />
          ))}
        </div>
      ) : !isLoading && !campaigns.length ? (
        <div>
          <h2>...no campaigns to see (yet)...</h2>
        </div>
      ) : (
        <div>
          <h2>...loading campaigns...</h2>
        </div>
      )}
    </div>
  );
}

export default AllCampaigns;

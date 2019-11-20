import React, { useState, useEffect } from "react";
import api from "../utils/api";

import Campaign from "./Campaign";

function AllCampaigns(props) {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleChange = event => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSearchType = event => {
    setSearchType(event.target.value);
  };

  const clearSearch = event => {
    event.preventDefault();
    setSearchTerm("");
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
  };

  useEffect(() => {
    const results = campaigns.filter(campaign => {
      if (searchType === "title") {
        return campaign.title.toLowerCase().includes(searchTerm);
      } else if (searchType === "location") {
        return campaign.location.toLowerCase().includes(searchTerm);
      } else if (searchType === "species") {
        return campaign.species.toLowerCase().includes(searchTerm);
      }
    });
    setCampaigns(results);
  }, [searchTerm]);

  return (
    <div className="main-section">
      <h1>Current Campaigns</h1>
      <div>
        <label htmlFor="search">Search by: </label>
        <select name="organization_id" onChange={handleSearchType}>
          <option required value="title">
            Title
          </option>
          <option required value="location">
            Location
          </option>
          <option required value="species">
            Species
          </option>
        </select>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleChange}
        />
        <button onClick={clearSearch}>x</button>
      </div>
      {!isLoading && campaigns.length ? (
        <div>
          {campaigns.map(campaign => (
            <Campaign key={campaign.id} campaign={campaign} />
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

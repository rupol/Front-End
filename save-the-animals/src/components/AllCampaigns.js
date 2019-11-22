import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Campaign from "./Campaign";

import { getSuppCampaigns, setCampaigns } from "../actions/action";

function AllCampaigns(props) {
  const [searchType, setSearchType] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    props.getSuppCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    props.getSuppCampaigns();
  };

  useEffect(() => {
    const results = props.campaigns.filter(campaign => {
      if (searchType === "title") {
        return campaign.title.toLowerCase().includes(searchTerm);
      } else if (searchType === "location") {
        return campaign.location.toLowerCase().includes(searchTerm);
      } else if (searchType === "species") {
        return campaign.species.toLowerCase().includes(searchTerm);
      } else return null;
    });
    props.setCampaigns(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className="main-section">
      <h1>Current Campaigns</h1>
      <div className="search-bar">
        <label htmlFor="search">Search by: </label>
        <div className="search-flex">
          <select
            name="organization_id"
            className="search-type"
            onChange={handleSearchType}
          >
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
            className="search-input"
            id="search"
            placeholder="Search Term"
            value={searchTerm}
            onChange={handleChange}
          />
          <button className=" btn clear-button" onClick={clearSearch}>
            x
          </button>
        </div>
      </div>
      {props.campaigns.length ? (
        <div>
          {props.campaigns.map(campaign => (
            <Campaign key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div>
          <h2>...no campaigns to see (yet)...</h2>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    campaigns: state.campaigns
  };
};

export default connect(mapStateToProps, { getSuppCampaigns, setCampaigns })(
  AllCampaigns
);

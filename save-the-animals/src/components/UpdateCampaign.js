import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { updateCampaign, getOrgCampaigns } from "../actions/action";

function UpdateCampaign(props) {
  const [campaign, setCampaign] = useState({
    title: "",
    location: "",
    species: "",
    urgency: "",
    image_url: "",
    organization_id: Number(localStorage.getItem("organ_id"))
  });

  useEffect(() => {
    props.getOrgCampaigns();
    props.campaigns.map(camp => {
      camp.campaigns_id === Number(props.match.params.id) &&
        setCampaign({
          ...campaign,
          title: camp.title,
          location: camp.location,
          species: camp.species,
          urgency: camp.urgency,
          image_url: camp.image_url
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id]);

  const handleChanges = event => {
    setCampaign({
      ...campaign,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setCampaign({
      ...campaign,
      organization_id: Number(localStorage.getItem("organ_id"))
    });
    props.updateCampaign(campaign, props.match.params.id, props.history);
  };

  return (
    <div className="main-section">
      <h1>Update A Campaign</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="formTitle">Campaign Title</label>
        <input
          type="text"
          id="formTitle"
          name="title"
          placeholder="Campaign Title"
          value={campaign.title}
          onChange={handleChanges}
        />
        <label htmlFor="formLocation">Location</label>
        <input
          type="text"
          id="formLocation"
          name="location"
          placeholder="Location"
          value={campaign.location}
          onChange={handleChanges}
        />
        <label htmlFor="formSpecies">Species</label>
        <input
          type="text"
          id="formSpecies"
          name="species"
          placeholder="Species"
          value={campaign.species}
          onChange={handleChanges}
        />
        <label htmlFor="formUrgency">Urgency (1 = least urgent)</label>
        <input
          type="number"
          min="1"
          max="10"
          id="formUrgency"
          name="urgency"
          placeholder="Urgency (1=most urgent)"
          value={campaign.urgency}
          onChange={handleChanges}
        />
        <button className="btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    organID: state.organID,
    campaigns: state.campaigns
  };
};

export default connect(mapStateToProps, { updateCampaign, getOrgCampaigns })(
  UpdateCampaign
);

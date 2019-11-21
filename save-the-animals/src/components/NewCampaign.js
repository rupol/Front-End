import React, { useState } from "react";
import { connect } from "react-redux";

import { createCampaign } from "../actions/action";

function NewCampaign(props) {
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    location: "",
    species: "",
    urgency: "",
    image_url: "",
    organization_id: Number(localStorage.getItem("organ_id"))
  });

  const handleChanges = event => {
    setNewCampaign({
      ...newCampaign,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.createCampaign(newCampaign, props.history);
  };

  return (
    <div className="main-section">
      <h1>Add a New Campaign</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="formTitle">Title</label>
        <input
          type="text"
          id="formTitle"
          name="title"
          placeholder="Campaign Title"
          value={newCampaign.title}
          onChange={handleChanges}
          required
        />
        <label htmlFor="formLocation">Location</label>
        <input
          type="text"
          id="formLocation"
          name="location"
          placeholder="Location"
          value={newCampaign.location}
          onChange={handleChanges}
          required
        />
        <label htmlFor="formSpecies">Species</label>
        <input
          type="text"
          id="formSpecies"
          name="species"
          placeholder="Species"
          value={newCampaign.species}
          onChange={handleChanges}
          required
        />
        <label htmlFor="formUrgency">Urgency (1 = least urgent)</label>
        <input
          type="number"
          min="1"
          max="10"
          id="formUrgency"
          name="urgency"
          placeholder="Urgency"
          value={newCampaign.urgency}
          onChange={handleChanges}
          required
        />
        <button className="btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    organID: state.organID
  };
};

export default connect(mapStateToProps, { createCampaign })(NewCampaign);

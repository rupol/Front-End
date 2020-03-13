import React, { useState } from "react";
import { connect } from "react-redux";

import { createCampaign } from "../actions/action";

function NewCampaign(props) {
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    location: "",
    species: "",
    urgency_level: "",
    funding_goal: "",
    deadline: "",
    photo_url: ""
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
        <label htmlFor="formTitle">Description</label>
        <textarea
          type="textarea"
          id="formDescription"
          name="description"
          placeholder="Campaign Description"
          value={newCampaign.description}
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
          name="urgency_level"
          placeholder="Urgency"
          value={newCampaign.urgency_level}
          onChange={handleChanges}
          required
        />
        <label htmlFor="formUrgency">Funding Goal</label>
        <input
          type="number"
          min="1"
          max="1000000"
          id="formFunding"
          name="funding_goal"
          placeholder="Funding Goal"
          value={newCampaign.funding_goal}
          onChange={handleChanges}
          required
        />
        <label htmlFor="formImage">Image URL</label>
        <input
          type="text"
          id="formImage"
          name="photo_url"
          placeholder="Photo Url"
          value={newCampaign.photo_url}
          onChange={handleChanges}
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

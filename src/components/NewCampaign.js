import React, { useState } from "react";
import api from "../utils/api";
import { connect } from "react-redux";

function NewCampaign(props) {
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    location: "",
    species: "",
    urgency: "",
    image_url: "",
    organization_id: Number(props.organID)
  });

  const handleChanges = event => {
    setNewCampaign({
      ...newCampaign,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    api()
      .post("/campaigns", newCampaign)
      .then(res => {
        props.history.push("/org-campaigns");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="main-section">
      <h1>Add a New Campaign</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="formTitle" hidden>
          Campaign Title:
        </label>
        <input
          type="text"
          id="formTitle"
          name="title"
          placeholder="Campaign Title"
          value={newCampaign.title}
          onChange={handleChanges}
        />
        <label htmlFor="formLocation" hidden>
          Location:
        </label>
        <input
          type="text"
          id="formLocation"
          name="location"
          placeholder="Location"
          value={newCampaign.location}
          onChange={handleChanges}
        />
        <label htmlFor="formSpecies" hidden>
          Species:
        </label>
        <input
          type="text"
          id="formSpecies"
          name="species"
          placeholder="Species"
          value={newCampaign.species}
          onChange={handleChanges}
        />
        <label htmlFor="formUrgency" hidden>
          Urgency:
        </label>
        <input
          type="number"
          min="1"
          max="10"
          id="formUrgency"
          name="urgency"
          placeholder="Urgency (1=most urgent)"
          value={newCampaign.urgency}
          onChange={handleChanges}
        />
        <button type="submit">Add Campaign</button>
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

export default connect(mapStateToProps, {})(NewCampaign);

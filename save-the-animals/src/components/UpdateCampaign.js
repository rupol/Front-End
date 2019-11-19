import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { connect } from "react-redux";

function UpdateCampaign(props) {
  const [campaign, setCampaign] = useState({
    title: "",
    location: "",
    species: "",
    urgency: "",
    image_url: "",
    organization_id: Number(props.organID)
  });

  useEffect(() => {
    api()
      .get(`/campaigns/organizations`)
      .then(result => {
        result.data.campaigns.map(camp => {
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
      })
      .catch(error => {
        console.log(error);
      });
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
      organization_id: Number(props.organID)
    });
    api()
      .put(`/campaigns/${props.match.params.id}`, campaign)
      .then(res => {
        props.history.push("/org-campaigns");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="main-section">
      <h1>Update A Campaign</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="formTitle" hidden>
          Campaign Title:
        </label>
        <input
          type="text"
          id="formTitle"
          name="title"
          placeholder="Campaign Title"
          value={campaign.title}
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
          value={campaign.location}
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
          value={campaign.species}
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
    organID: state.organID
  };
};

export default connect(mapStateToProps, {})(UpdateCampaign);

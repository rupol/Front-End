import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";

import {
  updateCampaign,
  getOrgCampaigns,
  deleteCampaign,
} from "../actions/action";

function UpdateCampaign(props) {
  const orgId = localStorage.getItem("organ_id");

  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    location: "",
    species: "",
    urgency_level: "",
    funding_goal: "",
    deadline: "",
    photo_url: "",
  });

  useEffect(() => {
    props.getOrgCampaigns(orgId);
    props.campaigns.forEach((camp) => {
      camp.id === Number(props.match.params.id) &&
        setCampaign({
          ...campaign,
          title: camp.title,
          description: camp.description,
          location: camp.location,
          species: camp.species,
          urgency_level: camp.urgency_level,
          funding_goal: camp.funding_goal,
          deadline: camp.deadline,
          photo_url: camp.photo_url,
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id]);

  const handleChanges = (event) => {
    setCampaign({
      ...campaign,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    window.confirm(
      "Are you sure you want to delete this campaign? This action cannot be undone"
    ) && props.deleteCampaign(props.match.params.id);
    props.history.push("/org-campaigns");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCampaign({
      ...campaign,
      organization_id: Number(localStorage.getItem("organ_id")),
    });
    props.updateCampaign(campaign, props.match.params.id, props.history);
  };

  return (
    <div className="main-section">
      <h1>Update A Campaign</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="formTitle">Title</label>
        <input
          type="text"
          id="formTitle"
          name="title"
          placeholder="Campaign Title"
          value={campaign.title}
          onChange={handleChanges}
          required
        />
        <label htmlFor="formTitle">Description</label>
        <textarea
          type="textarea"
          id="formDescription"
          name="description"
          placeholder="Campaign Description"
          value={campaign.description}
          onChange={handleChanges}
          required
        />
        <label htmlFor="formLocation">Location</label>
        <input
          type="text"
          id="formLocation"
          name="location"
          placeholder="Location"
          value={campaign.location}
          onChange={handleChanges}
          required
        />
        <label htmlFor="formSpecies">Species</label>
        <input
          type="text"
          id="formSpecies"
          name="species"
          placeholder="Species"
          value={campaign.species}
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
          value={campaign.urgency_level}
          onChange={handleChanges}
          required
        />
        <label htmlFor="formFunding">Funding Goal</label>
        <input
          type="number"
          min="1"
          max="1000000"
          id="formFunding"
          name="funding_goal"
          placeholder="Funding Goal"
          value={campaign.funding_goal}
          onChange={handleChanges}
          required
        />
        <label htmlFor="formDeadline">Deadline</label>
        <input
          type="date"
          id="formDeadline"
          name="deadline"
          placeholder="Deadline"
          value={moment(campaign.deadline).format("YYYY-MM-DD")}
          // value={campaign.deadline}
          onChange={handleChanges}
          required
        />
        <label htmlFor="formImage">Image URL</label>
        <input
          type="text"
          id="formImage"
          name="photo_url"
          placeholder="Photo Url"
          value={campaign.photo_url}
          onChange={handleChanges}
        />
        <button className="btn" type="submit">
          Update
        </button>
        <button
          onClick={handleDelete}
          value={campaign.campaigns_id}
          className="btn delete-button"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    organID: state.organID,
    campaigns: state.campaigns,
  };
};

export default connect(mapStateToProps, {
  updateCampaign,
  getOrgCampaigns,
  deleteCampaign,
})(UpdateCampaign);

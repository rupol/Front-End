import React, { useEffect, useState } from "react";
import OrganizationCard from "./OrganizationCard";
import { CampaignFormik } from "./CampaignForm";
import { connect } from "react-redux";
import styled from "styled-components";
import { getUserCampaigns } from "../../utils";

const OrganizationPageStyle = styled.section`
  width: 80vw;
  min-height: 500px;
`;
function LocalOrganizationPage(props) {
  const [myCampaigns, setMyCampaigns] = useState([]);

  useEffect(() => {
    if (props.user) {
      getUserCampaigns(props.user.userid)
        .then(response => console.log(response.data))
        .catch(error => console.log("Failed to get my campaigns", error));
    }
  }, [myCampaigns, props.user]);

  const cards = myCampaigns.map((e, i) => {
    return <OrganizationCard setForm={props.setForm} key={i} {...e} />;
  });

  return (
    <OrganizationPageStyle>
      <CampaignFormik form={props.form} />
      {cards}
    </OrganizationPageStyle>
  );
}

export const OrganizationPage = connect(state => {
  return { user: state.login.user };
})(LocalOrganizationPage);

export default OrganizationPage;

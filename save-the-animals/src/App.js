import React from "react";
import { Route, NavLink, withRouter } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import OrgCampaigns from "./components/OrgCampaigns";
import NewCampaign from "./components/NewCampaign";

import { getToken } from "./utils/api";

function App() {
  const loggedIn = getToken();

  return (
    <div className="App">
      <h1>Save the Animals</h1>
      <NavLink to="/">Home</NavLink>
      {!loggedIn && (
        <NavLink exact to="/login">
          Log In
        </NavLink>
      )}
      {!loggedIn && (
        <NavLink exact to="/signup">
          Sign Up
        </NavLink>
      )}
      {loggedIn && (
        <NavLink exact to="/org-campaigns">
          Campaigns
        </NavLink>
      )}
      {loggedIn && (
        <NavLink exact to="/new-campaign">
          New Campaign
        </NavLink>
      )}
      {loggedIn && (
        <NavLink exact to="/logout">
          Log Out
        </NavLink>
      )}
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <ProtectedRoute exact path="/org-campaigns" component={OrgCampaigns} />
      <ProtectedRoute exact path="/new-campaign" component={NewCampaign} />
      <ProtectedRoute exact path="/logout" component={Logout} />
    </div>
  );
}

export default withRouter(App);

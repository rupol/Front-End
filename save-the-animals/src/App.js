import React from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import OrgCampaigns from "./components/OrgCampaigns";
import NewCampaign from "./components/NewCampaign";

import { getToken } from "./utils/api";
import UpdateCampaign from "./components/UpdateCampaign";
import AllCampaigns from "./components/AllCampaigns";

import loader from "./img/loader.gif";

function App(props) {
  const loggedIn = getToken();

  return (
    <div className="App">
      <nav>
        <NavLink className="logo" exact to="/">
          Save the Animals
        </NavLink>
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
        {loggedIn && props.userType === "organization" ? (
          <>
            <NavLink exact to="/org-campaigns">
              Campaigns
            </NavLink>
            <NavLink exact to="/new-campaign">
              New Campaign
            </NavLink>
          </>
        ) : loggedIn && props.userType === "supporter" ? (
          <NavLink exact to="/all-campaigns">
            All Campaigns
          </NavLink>
        ) : (
          <></>
        )}
        {loggedIn && (
          <NavLink exact to="/logout">
            Log Out
          </NavLink>
        )}
      </nav>
      {props.isLoading ? (
        <img src={loader} alt="loading" className="loader" />
      ) : (
        <>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <ProtectedRoute
            exact
            path="/org-campaigns"
            component={OrgCampaigns}
          />
          <ProtectedRoute
            exact
            path="/org-campaigns/:id"
            component={UpdateCampaign}
          />
          <ProtectedRoute
            exact
            path="/all-campaigns"
            component={AllCampaigns}
          />
          <ProtectedRoute exact path="/new-campaign" component={NewCampaign} />
          <ProtectedRoute exact path="/logout" component={Logout} />
        </>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userType: state.userType,
    isLoading: state.isLoading
  };
};

export default withRouter(connect(mapStateToProps, {})(App));

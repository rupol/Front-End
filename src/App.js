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
import error from "./img/error.jpg";

function App(props) {
  const loggedIn = getToken();
  const userType = localStorage.getItem("user_type");

  return (
    <div className="App">
      <nav>
        <NavLink className="logo" exact to="/all-campaigns">
          Key Conservation
        </NavLink>
        {!loggedIn && (
          <>
            <NavLink exact to="/login">
              Log In
            </NavLink>

            <NavLink exact to="/signup">
              Sign Up
            </NavLink>
          </>
        )}
        {loggedIn && userType === "organization" ? (
          <>
            <NavLink exact to="/org-campaigns">
              Campaigns
            </NavLink>
            <NavLink exact to="/new-campaign">
              New Campaign
            </NavLink>
          </>
        ) : loggedIn && userType === "supporter" ? (
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
      ) : props.error ? (
        <div className="oops">
          <img src={error} alt="error" className="error-img" />
          <h2 className="error">
            <span>
              Sorry, something has gone wrong
              <span className="spacer"></span>
              <br />
              <span className="spacer"></span> Please try again
            </span>
          </h2>
        </div>
      ) : (
        <>
          {loggedIn && userType === "organization" ? (
            <Route exact path="/" component={OrgCampaigns} />
          ) : loggedIn && userType === "supporter" ? (
            <Route exact path="/" component={AllCampaigns} />
          ) : (
            <Route exact path="/" component={AllCampaigns} />
          )}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/all-campaigns" component={AllCampaigns} />
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
    isLoading: state.isLoading,
    error: state.error
  };
};

export default withRouter(connect(mapStateToProps, {})(App));

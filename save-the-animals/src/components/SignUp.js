import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";
import {
  fetchOrgList,
  setUserType,
  setOrganID,
  LogIn
} from "../actions/action";

function SignUp(props) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
    organization_id: null
  });

  useEffect(() => {
    props.fetchOrgList();
  }, []);

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const setUserType = event => {
    if (user.userType === "organization") {
      props.setUserType("organization");
      props.setOrganID(user.organization_id);
    } else {
      props.setUserType("supporter");
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUserType();
    axios
      .post("https://saving-the-animals.herokuapp.com/api/auth/register", user)
      .then(res => {
        console.log(res);
        props.LogIn(user, props.userType, props.history);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="main-section">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <div className="user-type-inputs">
          <p>Account Type</p>
          <div className="user-input org-input">
            <label htmlFor="organization">Organization</label>
            <input
              type="radio"
              name="userType"
              id="organization"
              value="organization"
              onChange={handleChange}
              required
            />
          </div>
          <div className="user-input supp-input">
            <label htmlFor="supporter">Supporter</label>
            <input
              type="radio"
              name="userType"
              id="supporter"
              value="support"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {user.userType === "organization" && (
          <div className="org-select">
            <label htmlFor="organization_id">
              Select your organization: <br />
            </label>
            <select name="organization_id" onChange={handleChange}>
              <option disabled onChange={handleChange}>
                Select your organization:
              </option>
              {props.orgList.map(org => (
                <option
                  required
                  key={org.id}
                  value={org.id}
                  onChange={handleChange}
                >
                  {org.organ_name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
      <h3>
        Already have an account? <Link to="/login">Log In</Link>
      </h3>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    orgList: state.orgList,
    userType: state.userType
  };
};

export default connect(mapStateToProps, {
  fetchOrgList,
  setUserType,
  setOrganID,
  LogIn
})(SignUp);

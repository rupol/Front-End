import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  fetchOrgList,
  setUserType,
  setOrganID,
  signUp
} from "../actions/action";

function SignUp(props) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
    organization_id: 1
  });

  useEffect(() => {
    props.fetchOrgList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const setUserType = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
    if (event.target.value === "organization") {
      props.setUserType("organization");
      localStorage.setItem("user_type", "organization");
    } else {
      props.setUserType("supporter");
      localStorage.setItem("user_type", "supporter");
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.setOrganID(Number(user.organization_id));
    props.signUp(user, props.userType, props.history);
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
              onChange={setUserType}
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
              onChange={setUserType}
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
              {props.orgList.map(org => (
                <option required key={org.id} value={org.id}>
                  {org.name}
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
  signUp
})(SignUp);

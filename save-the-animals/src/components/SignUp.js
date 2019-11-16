import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";
import { fetchOrgList } from "../actions/action";

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

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post("https://saving-the-animals.herokuapp.com/api/auth/register", user)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="main-section">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <input
          type="radio"
          name="userType"
          id="organization"
          value="organization"
          onChange={handleChange}
        />
        <label htmlFor="organization">Organization</label>
        <input
          type="radio"
          name="userType"
          id="supporter"
          value="support"
          onChange={handleChange}
        />
        <label htmlFor="supporter">Supporter</label>
        {user.userType === "organization" && (
          <div>
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
        <button type="submit">Sign Up</button>
      </form>
      <h3>
        Already have an account? <Link to="/login">Log In</Link>
      </h3>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    orgList: state.orgList
  };
};

export default connect(mapStateToProps, { fetchOrgList })(SignUp);

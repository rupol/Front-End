import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setUserType, LogIn } from "../actions/action";

function Login(props) {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const setUserType = event => {
    if (event.target.value === "organization") {
      props.setUserType("organization");
    } else {
      props.setUserType("supporter");
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.LogIn(user, props.userType, props.history);
  };

  return (
    <div className="main-section">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
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
          onChange={setUserType}
        />
        <label htmlFor="organization">Organization</label>
        <input
          type="radio"
          name="userType"
          id="supporter"
          value="support"
          onChange={setUserType}
        />
        <label htmlFor="supporter">Supporter</label>
        <button type="submit">Log In</button>
      </form>
      <h3>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </h3>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userType: state.userType
  };
};

export default connect(mapStateToProps, { setUserType, LogIn })(Login);

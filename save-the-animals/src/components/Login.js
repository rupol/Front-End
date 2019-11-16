import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import api from "../utils/api";

import { setUserToState } from "../actions/action";

function Login(props) {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const [isOrg, setIsOrg] = useState(false);

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const setUserType = event => {
    if (event.target.value === "organization") {
      setIsOrg(true);
      console.log(event.target.value);
    } else {
      console.log(event.target.value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    api()
      .post("/auth/login", user)
      .then(res => {
        console.log(res);
        props.setUserToState(user);
        localStorage.setItem("organ_id", res.data.organ_id);
        localStorage.setItem("token", res.data.token);
        if (isOrg) {
          props.history.push("/org-campaigns");
          console.log("org:", isOrg); //should be true
        } else {
          // props.history.push("/all-campaigns");
          console.log("org:", isOrg); //should be false
        }
      })
      .catch(err => {
        console.log(err);
      });
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
    user: state.user
  };
};

export default connect(mapStateToProps, { setUserToState })(Login);

import React from "react";
import { Redirect } from "react-router-dom";

function Logout(props) {
  localStorage.removeItem("token");
  localStorage.removeItem("organ_id");
  localStorage.removeItem("user_type");
  return <Redirect to="/login" />;
}

export default Logout;

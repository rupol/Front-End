import axios from "axios";
import api from "../utils/api";

export const FETCH_ORGS = "FETCH_ORGS";
export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_ORGAN_ID = "SET_ORGAN_ID";

export function fetchOrgList() {
  return dispatch => {
    axios
      .get("https://saving-the-animals.herokuapp.com/api/organizations")
      .then(res => {
        dispatch({ type: FETCH_ORGS, payload: res.data });
      })
      .catch(err => console.log(err));
  };
}

export function setUserType(type) {
  return {
    type: SET_USER_TYPE,
    payload: type
  };
}

export function setOrganID(id) {
  return {
    type: SET_ORGAN_ID,
    payload: id
  };
}

export function LogIn(user, userType, history) {
  return dispatch => {
    api()
      .post("/auth/login", user)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        if (userType === "organization") {
          dispatch({ type: SET_ORGAN_ID, payload: res.data.organ_id });
          history.push("/org-campaigns");
        } else {
          history.push("/all-campaigns");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

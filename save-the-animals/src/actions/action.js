import axios from "axios";
import api from "../utils/api";

export const FETCH_ORGS = "FETCH_ORGS";
export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_ORGAN_ID = "SET_ORGAN_ID";
export const REQUEST_START = "REQUEST_START";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_ERROR = "REQUEST_ERROR";

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
    dispatch({ type: REQUEST_START });
    api()
      .post("/auth/login", user)
      .then(res => {
        dispatch({ type: REQUEST_SUCCESS });
        localStorage.setItem("token", res.data.token);
        if (userType === "organization") {
          dispatch({ type: SET_ORGAN_ID, payload: res.data.organ_id });
          localStorage.setItem("organ_id", res.data.organ_id);
          history.push("/org-campaigns");
        } else {
          history.push("/all-campaigns");
        }
      })
      .catch(err => {
        dispatch({ type: REQUEST_ERROR, payload: err });
      });
  };
}

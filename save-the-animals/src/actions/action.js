import axios from "axios";

export const FETCH_ORGS = "FETCH_ORGS";
export const SET_USER = "SET_USER";

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

export function setUserToState(user) {
  return dispatch => {
    dispatch({
      type: SET_USER,
      payload: user
    });
  };
}

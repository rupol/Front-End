import api from "../utils/api";

export const FETCH_ORGS = "FETCH_ORGS";
export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_ORGAN_ID = "SET_ORGAN_ID";
export const SET_CAMPAIGNS = "SET_CAMPAIGNS";
export const REQUEST_START = "REQUEST_START";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_ERROR = "REQUEST_ERROR";

export function fetchOrgList() {
  return dispatch => {
    api()
      .get("/organizations")
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

export function signUp(user, userType, history) {
  return dispatch => {
    dispatch({ type: REQUEST_START });
    api()
      .post("/auth/register", user)
      .then(res => {
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
      })
      .catch(err => {
        dispatch({ type: REQUEST_ERROR, payload: err });
      });
  };
}

export function getOrgCampaigns() {
  return dispatch => {
    // dispatch({ type: REQUEST_START });
    api()
      .get("/campaigns/organizations")
      .then(res => {
        dispatch({ type: SET_CAMPAIGNS, payload: res.data.campaigns });
        dispatch({ type: REQUEST_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: REQUEST_ERROR, payload: err });
      });
  };
}

export function getSuppCampaigns() {
  return dispatch => {
    // dispatch({ type: REQUEST_START });
    api()
      .get("/campaigns/supporters")
      .then(res => {
        console.log(res);
        dispatch({ type: SET_CAMPAIGNS, payload: res.data.campaigns });
        dispatch({ type: REQUEST_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: REQUEST_ERROR, payload: err });
      });
  };
}

export function setCampaigns(campaign) {
  return {
    type: SET_CAMPAIGNS,
    payload: campaign
  };
}

export function deleteCampaign(campaignID) {
  return dispatch => {
    dispatch({ type: REQUEST_START });
    api()
      .delete(`/campaigns/${campaignID}`)
      .then(res => {
        dispatch({ type: REQUEST_SUCCESS });
        getOrgCampaigns();
      })
      .catch(err => {
        dispatch({ type: REQUEST_ERROR, payload: err });
      });
  };
}

export function createCampaign(campaign, history) {
  return dispatch => {
    dispatch({ type: REQUEST_START });
    api()
      .post("/campaigns", campaign)
      .then(res => {
        dispatch({ type: REQUEST_SUCCESS });
        history.push("/org-campaigns");
      })
      .catch(err => {
        dispatch({ type: REQUEST_ERROR, payload: err });
      });
  };
}

export function updateCampaign(campaign, campaignID, history) {
  return dispatch => {
    dispatch({ type: REQUEST_START });
    api()
      .put(`/campaigns/${campaignID}`, campaign)
      .then(res => {
        dispatch({ type: REQUEST_SUCCESS });
        history.push("/org-campaigns");
      })
      .catch(err => {
        dispatch({ type: REQUEST_ERROR, payload: err });
      });
  };
}

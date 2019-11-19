import { FETCH_ORGS, SET_USER_TYPE, SET_ORGAN_ID } from "../actions/action";

const initialState = {
  orgList: [],
  userType: "",
  organID: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORGS:
      return {
        ...state,
        orgList: action.payload
      };
    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload
      };
    case SET_ORGAN_ID:
      return {
        ...state,
        organID: action.payload
      };
    default:
      return state;
  }
}

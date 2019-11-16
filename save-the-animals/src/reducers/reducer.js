import { FETCH_ORGS, SET_USER } from "../actions/action";

const initialState = {
  orgList: [],
  user: {}
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORGS:
      return {
        ...state,
        orgList: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}

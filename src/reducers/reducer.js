import {
  FETCH_ORGS,
  SET_USER_TYPE,
  SET_ORGAN_ID,
  SET_CAMPAIGNS,
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR
} from "../actions/action";

const initialState = {
  orgList: [],
  userType: "",
  organID: null,
  campaigns: [],
  isLoading: false,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
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
    case SET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload
      };
    default:
      return state;
  }
}

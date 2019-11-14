import {
  FETCH_CAMPAIGN_START,
  FETCH_CAMPAIGN_SUCCESS,
  FETCH_CAMPAIGN_ERROR
} from "../actions/campaigns";

const initialState = {
  campaigns: {},
  isLoading: false,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAMPAIGN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaigns: action.payload,
        isLoading: false
      };
    case FETCH_CAMPAIGN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}

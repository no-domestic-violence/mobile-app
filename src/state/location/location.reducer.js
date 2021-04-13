import {
  UPDATE_LOCATION,
  FETCH_SHELTERS,
  SEARCH_HOTLINES,
} from './location.types';

const locationReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return { ...state, currentLocation: action.payload };
    case FETCH_SHELTERS:
      return { ...state, shelters_list: action.payload };
    case SEARCH_HOTLINES:
      return { ...state, hotlinesData: action.payload };
    default:
      return state;
  }
};

export default locationReducer;

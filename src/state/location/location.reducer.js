import types from './location.types';

const locationReducer = (state, { type, payload }) => {
  switch (type) {
    case types.UPDATE_LOCATION:
      return { ...state, currentLocation: payload };
    case types.FETCH_SHELTERS:
      return { ...state, sheltersList: payload };
    case types.SEARCH_HOTLINES:
      return { ...state, hotlinesData: payload };
    default:
      return state;
  }
};

export default locationReducer;

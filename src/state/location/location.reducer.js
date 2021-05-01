import types from './location.types';
import { createReducer } from '../../helpers';

const getCurrentLocationCase = (state, { payload }) => {
  return { ...state, currentLocation: payload };
};

const fetchSheltersCase = (state, { payload }) => {
  return { ...state, sheltersList: payload };
};

const searchHotlineCase = (state, { payload }) => {
  return { ...state, hotlinesData: payload };
};

const locationReducer = createReducer({
  [types.UPDATE_LOCATION]: getCurrentLocationCase,
  [types.FETCH_SHELTERS]: fetchSheltersCase,
  [types.SEARCH_HOTLINES]: searchHotlineCase,
});

export default locationReducer;

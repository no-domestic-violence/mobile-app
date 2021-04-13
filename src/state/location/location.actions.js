import appApiClient from 'api/';
import * as types from './location.types';

const updateCurrentLocation = (dispatch) => (location) => {
  dispatch({ type: types.UPDATE_LOCATION, payload: location });
};

const fetchShelters = (dispatch) => async () => {
  const response = await appApiClient.getSheltersData();
  dispatch({ type: types.FETCH_SHELTERS, payload: response.data });
};

const searchHotlinesByParam = (dispatch) => async (searchParam) => {
  const response = await appApiClient.getHotlinesData(searchParam);
  dispatch({ type: types.SEARCH_HOTLINES, payload: response.data });
};

export { updateCurrentLocation, fetchShelters, searchHotlinesByParam };

import appApiClient from 'api/';
import types from './location.types';

const updateCurrentLocation = (dispatch) => (location) => {
  dispatch({ type: types.UPDATE_LOCATION, payload: location });
};

const fetchShelters = (dispatch) => async () => {
  const { data } = await appApiClient.getSheltersData();
  dispatch({ type: types.FETCH_SHELTERS, payload: data.shelters });
};

const searchHotlinesByParam = (dispatch) => async (searchParam) => {
  const { data } = await appApiClient.getHotlinesData(searchParam);
  dispatch({ type: types.SEARCH_HOTLINES, payload: data.hotlines });
};

export { updateCurrentLocation, fetchShelters, searchHotlinesByParam };

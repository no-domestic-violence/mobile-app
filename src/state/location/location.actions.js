import appApiClient from 'api/';

const updateCurrentLocation = (dispatch) => (location) => {
  dispatch({ type: 'UPDATE_LOCATION', payload: location });
};

const fetchShelters = (dispatch) => async () => {
  const response = await appApiClient.getSheltersData();
  dispatch({ type: 'FETCH_SHELTERS', payload: response.data });
};

const searchHotlinesByParam = (dispatch) => async (searchParam) => {
  const response = await appApiClient.getHotlinesData(searchParam);
  dispatch({ type: 'SEARCH_HOTLINES', payload: response.data });
};

export { updateCurrentLocation, fetchShelters, searchHotlinesByParam };

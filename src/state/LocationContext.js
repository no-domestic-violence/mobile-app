import createAppContext from './CreateAppContext';
import appApiClient, { apiInstance } from 'api/';

const LocationReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'FETCH_SHELTERS':
      return { ...state, shelters_list: action.payload };
    case 'SEARCH_HOTLINES':
      return { ...state, hotlinesData: action.payload };
    default:
      return state;
  }
};

const updateCurrentLocation = (dispatch) => (location) => {
  dispatch({ type: 'UPDATE_LOCATION', payload: location });
};

const fetchShelters = (dispatch) => async () => {
  const response = await apiInstance.get('/shelters');
  dispatch({ type: 'FETCH_SHELTERS', payload: response.data });
};

const searchHotlinesByParam = (dispatch) => async (searchParam) => {
  const response = await appApiClient.getHotlinesData(searchParam);
  dispatch({ type: 'SEARCH_HOTLINES', payload: response.data });
};

export const { Provider, Context } = createAppContext(
  LocationReducer,
  {
    updateCurrentLocation,
    fetchShelters,
    searchHotlinesByParam,
  },
  { currentLocation: null, shelters_list: [], hotlinesData:  [] }
);

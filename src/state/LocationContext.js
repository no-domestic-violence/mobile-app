import createAppContext from './CreateAppContext';
import appApiClient from '../api/appApiClient';

const LocationReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'FETCH_SHELTERS':
      return { ...state, shelters_list: action.payload };
    default:
      return state;
  }
};

const updateCurrentLocation = (dispatch) => (location) => {
  dispatch({ type: 'UPDATE_LOCATION', payload: location });
};

const fetchShelters = (dispatch) => async () => {
  const response = await appApiClient.get('/shelters');
  dispatch({ type: 'FETCH_SHELTERS', payload: response.data });
};
export const { Provider, Context } = createAppContext(
  LocationReducer,
  {
    updateCurrentLocation,
    fetchShelters,
  },
  { currentLocation: null, shelters_list: [] }
);

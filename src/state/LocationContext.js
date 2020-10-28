import { AsyncStorage } from 'react-native';
import createAppContext from './CreateAppContext';
import appApiClient from '../api/appApiClient';

const LocationReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return { ...state, currentLocation: action.payload };
    default:
      return state;
  }
};

const updateCurrentLocation = (dispatch) => (location) => {
  dispatch({ type: 'UPDATE_LOCATION', payload: location });
};

export const { Provider, Context } = createAppContext(
  LocationReducer,
  {
    updateCurrentLocation
  },
  { currentLocation: null },
);

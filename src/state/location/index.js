import createAppContext from '../CreateAppContext';
import locationReducer from './location.reducer';
import {
  updateCurrentLocation,
  fetchShelters,
  searchHotlinesByParam,
} from './location.actions';

export const { Provider, Context } = createAppContext(
  locationReducer,
  {
    updateCurrentLocation,
    fetchShelters,
    searchHotlinesByParam,
  },
  { currentLocation: null, shelters_list: [], hotlinesData: [] }
);

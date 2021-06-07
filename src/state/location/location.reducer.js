import types from './location.types';
import { createReducer, updateState } from '../../helpers';

const locationReducer = createReducer({
  [types.UPDATE_LOCATION]: updateState('currentLocation'),
  [types.FETCH_SHELTERS]: updateState('sheltersList'),
  [types.SEARCH_HOTLINES]: updateState('hotlinesData'),
});

export default locationReducer;

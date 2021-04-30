import types from './location.types';

const getCurrentLocationCase = (state, { payload }) => {
  return { ...state, currentLocation: payload };
};

const fetchSheltersCase = (state, { payload }) => {
  return { ...state, sheltersList: payload };
};

const searchHotlineCase = (state, { payload }) => {
  return { ...state, hotlinesData: payload };
};

function createReducer(handlers) {
  return function reducer(state, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      console.log(state);
      return state;
    }
  };
}

const locationReducer = createReducer({
  [types.UPDATE_LOCATION]: getCurrentLocationCase,
  [types.FETCH_SHELTERS]: fetchSheltersCase,
  [types.SEARCH_HOTLINES]: searchHotlineCase,
});

export default locationReducer;

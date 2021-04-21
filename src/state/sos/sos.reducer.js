import {
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  ERROR,
} from './sos.types';

// function createReducer(stateKey, types) {
//   return function reducer(state, { type, payload }) {
//     return type ? { ...state, [stateKey]: payload } : state;
//   };
// }

// TODO: how to make this reusable? split error reducer?
function createSosReducer() {
  return function reducer(state, { type, payload }) {
    if (type !== ERROR) {
      return { ...state, contacts: payload };
    }
    if (type === ERROR) {
      return { ...state, errorMessage: payload };
    }
    return {
      state,
    };
  };
}

const sosReducer = createSosReducer({
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  ERROR,
});

export default sosReducer;

import {
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
} from './sos.types';

function createSosReducer(types) {
  return function reducer(state, { type, payload }) {
    if (type) {
      return payload;
    }
    return state;
  };
}

const sosReducer = createSosReducer({
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
});

export default sosReducer;

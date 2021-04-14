import {
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
} from './sos.types';

const sosReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      return { contacts: payload };
    case EDIT_CONTACT:
      return {
        contacts: payload,
      };
    case DELETE_CONTACT:
      return { contacts: payload };
    case GET_CONTACTS:
      return { contacts: payload };
    default:
      return state;
  }
};

export default sosReducer;

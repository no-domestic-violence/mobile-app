import { createReducer, updateState, handleErrorMessage } from 'helpers/index';
import types from './sos.types';

const handleContacts = updateState('contacts');

const sosHandlers = {
  [types.ADD_CONTACT]: handleContacts,
  [types.EDIT_CONTACT]: handleContacts,
  [types.DELETE_CONTACT]: handleContacts,
  [types.GET_CONTACTS]: handleContacts,
  [types.ERROR]: handleErrorMessage
};
const sosReducer = createReducer(sosHandlers);


export default sosReducer;

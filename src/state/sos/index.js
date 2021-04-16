import createAppContext from 'helpers/createAppContext';
import {
  getContacts,
  deleteContact,
  addContact,
  editContact,
} from './sos.actions';
import sosReducer from './sos.reducer';

export const { Provider, Context } = createAppContext(
  sosReducer,
  {
    getContacts,
    deleteContact,
    addContact,
    editContact,
  },
  { contacts: [] }
);

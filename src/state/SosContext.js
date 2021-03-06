/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import * as SecureStore from 'expo-secure-store';
import createAppContext from './CreateAppContext';
import { apiInstance } from 'api/';

const ACTIONS = {
  ADD_CONTACT: 'ADD_CONTACT',
  EDIT_CONTACT: 'EDIT_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  GET_CONTACTS: 'GET_CONTACTS',
};

const sosReducer = (state, action) => {
  // (current state, action to pass to dispatch )
  const { contacts } = state;
  const { id, data } = action.payload;
  switch (action.type) {
    case ACTIONS.ADD_CONTACT:
      return { contacts: [...contacts, data] };
    case ACTIONS.EDIT_CONTACT:
      return {
        ...contacts,
        contacts: contacts.map((contact) =>
          contact._id === id ? data : contact
        ),
      };
    case ACTIONS.DELETE_CONTACT:
      return {
        ...contacts,
        contacts: contacts.filter((contact) => contact._id !== id),
      };
    case ACTIONS.GET_CONTACTS:
      return { contacts: action.payload };
    default:
      return state;
  }
};

const getContacts = (dispatch) => async () => {
  try {
    const username = await SecureStore.getItemAsync('username');
    const token = await SecureStore.getItemAsync('token');
    const response = await apiInstance.get(`/users/${username}/contacts`, {
      headers: { 'auth-token': token },
    });
    dispatch({ type: ACTIONS.GET_CONTACTS, payload: response.data.contacts });
  } catch (error) {
    console.error(error);
  }
};

const deleteContact = (dispatch) => async ({ id }) => {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('token');
  await apiInstance
    .delete(`/users/${username}/contacts/`, {
      params: { id },
      headers: { 'auth-token': token },
    })
    .then(() => {
      dispatch({ type: ACTIONS.DELETE_CONTACT, payload: { id } });
    })
    .catch((e) => {
      alert(e);
    });
};

const addContact = (dispatch) => async (data) => {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('token');
  await apiInstance
    .patch(`/users/${username}/contacts/`, data, {
      headers: { 'auth-token': token },
    })
    .then(() => {
      dispatch({ type: ACTIONS.ADD_CONTACT, payload: { data } });
    })
    .catch((e) => {
      alert(e);
    });
};

const editContact = (dispatch) => async ({ data, id }) => {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('token');
  await apiInstance
    .patch(`/users/${username}/contacts/${id}`, data, {
      headers: { 'auth-token': token },
    })
    .then(() => {
      dispatch({ type: ACTIONS.EDIT_CONTACT, payload: { id, data } });
    })
    .catch((e) => {
      alert(e);
    });
};

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

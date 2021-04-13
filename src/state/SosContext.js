/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import * as SecureStore from 'expo-secure-store';
import appApiClient from 'api/';
import createAppContext from 'helpers/createAppContext';

const ACTIONS = {
  ADD_CONTACT: 'ADD_CONTACT',
  EDIT_CONTACT: 'EDIT_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  GET_CONTACTS: 'GET_CONTACTS',
};

const sosReducer = (state, action) => {
  // (current state, action to pass to dispatch )
  switch (action.type) {
    case ACTIONS.ADD_CONTACT:
      return { contacts: action.payload };
    case ACTIONS.EDIT_CONTACT:
      return {
        contacts: action.payload,
      };
    case ACTIONS.DELETE_CONTACT:
      return { contacts: action.payload };
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
    const response = await appApiClient.getSosContacts(username, token);
    dispatch({ type: ACTIONS.GET_CONTACTS, payload: response.data.contacts });
  } catch (error) {
    console.error(error);
  }
};

const deleteContact = (dispatch) => async ({ id }) => {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('token');
  try {
    const response = await appApiClient.deleteSosContact(username, id, token);
    dispatch({ type: ACTIONS.DELETE_CONTACT, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

const addContact = (dispatch) => async (data) => {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('token');

  try {
    const response = await appApiClient.addSosContact(username, data, token);
    dispatch({ type: ACTIONS.ADD_CONTACT, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

const editContact = (dispatch) => async ({ data, id }) => {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('token');
  try {
    const response = await appApiClient.editSosContact(
      username,
      data,
      id,
      token
    );
    dispatch({ type: ACTIONS.EDIT_CONTACT, payload: response.data });
  } catch (error) {
    console.error(error);
  }
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

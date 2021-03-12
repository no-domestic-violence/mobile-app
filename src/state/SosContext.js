/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import * as SecureStore from 'expo-secure-store';
import appApiClient, { apiInstance } from 'api/';
import createAppContext from './CreateAppContext';

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
      return { contacts: [...contacts, action.payload] };
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
        contacts: contacts.filter((contact) => contact._id !== action.payload),
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
    const response = await appApiClient.getSosContacts(username, token);
    // apiInstance.get(`/users/${username}/contacts`, {
    //   headers: { 'auth-token': token },
    // });
    // console.log(response);
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
    dispatch({ type: ACTIONS.DELETE_CONTACT, payload: response.data.id });
  } catch (error) {
    console.error(error);
  }
};

const addContact = (dispatch) => async (data) => {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('token');

  try {
    const response = await appApiClient.addSosContact(username, data, token);
    // console.log('response', response);
    // console.log(response.data);
    // console.log('data', data);
    // await apiInstance
    //   .patch(`/users/${username}/contacts/`, data, {
    //     headers: { 'auth-token': token },
    //   })
    dispatch({ type: ACTIONS.ADD_CONTACT, payload: response.data });
  } catch (error) {
    console.error(error);
  }
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

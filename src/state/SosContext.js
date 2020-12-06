import { AsyncStorage } from 'react-native';
import createAppContext from './CreateAppContext';
import appApiClient from '../api/appApiClient';

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
      // TODO: how to restrict add more than 2
      return {
        ...state,
        addSuccess: action.payload,
      };
    case ACTIONS.EDIT_CONTACT:
      return { ...state, editSuccess: action.payload };
    case ACTIONS.DELETE_CONTACT:
      return { deleteSuccess: action.payload };
    case ACTIONS.GET_CONTACTS:
      return { ...state, contacts: action.payload };

    default:
      return state;
  }
};

const getContacts = (dispatch) => async () => {
  try {
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
    const response = await appApiClient.get(`/users/${username}/contacts`, {
      headers: { 'auth-token': token },
    });
    dispatch({ type: ACTIONS.GET_CONTACTS, payload: response.data.contacts });
  } catch (error) {
    console.error(error);
  }
};

const deleteContact = (dispatch) => async ({ id }) => {
  const username = await AsyncStorage.getItem('username');
  const token = await AsyncStorage.getItem('token');
  await appApiClient
    .delete(
      `/users/${username}/contacts/`,

      {
        params: { id },
        headers: { 'auth-token': token },
      },
    )
    .then((response) => {
      dispatch({ type: ACTIONS.DELETE_CONTACT, payload: response.data });
    })
    .catch((e) => {
      alert(e);
    });
};

const addContact = (dispatch) => async (data) => {
  const username = await AsyncStorage.getItem('username');
  const token = await AsyncStorage.getItem('token');
  await appApiClient
    .patch(`/users/${username}/contacts/`, data, {
      headers: { 'auth-token': token },
    })
    .then((response) => {
      dispatch({ type: ACTIONS.ADD_CONTACT, payload: response.data });
    })
    .catch((e) => {
      alert(e);
    });
};

const editContact = (dispatch) => async ({ data, id }) => {
  const username = await AsyncStorage.getItem('username');
  const token = await AsyncStorage.getItem('token');
  await appApiClient
    .patch(`/users/${username}/contacts/${id}`, data, {
      headers: { 'auth-token': token },
    })
    .then((response) => {
      dispatch({ type: ACTIONS.EDIT_CONTACT, payload: response.data });
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
  { contacts: [] },
);

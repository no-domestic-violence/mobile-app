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
    // case ACTIONS.ADD_CONTACT :
    //     return [...contact, newContact(action.payload)]
    // case ACTIONS.EDIT_CONTACT :
    //     return
    case ACTIONS.DELETE_CONTACT:
      return { successMessage: action.payload };
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

export const { Provider, Context } = createAppContext(
  sosReducer,
  {
    getContacts,
    deleteContact,
  },
  { contacts: [] },
);

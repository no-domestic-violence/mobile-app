/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import * as SecureStore from 'expo-secure-store';
import appApiClient from 'api/';
import * as types from './sos.types';

const getContacts = (dispatch) => async () => {
  try {
    const username = await SecureStore.getItemAsync('username');
    const token = await SecureStore.getItemAsync('token');
    const response = await appApiClient.getSosContacts(username, token);
    dispatch({ type: types.GET_CONTACTS, payload: response.data.contacts });
  } catch (error) {
    console.error(error);
  }
};

const deleteContact = (dispatch) => async ({ id }) => {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('token');
  try {
    const response = await appApiClient.deleteSosContact(username, id, token);
    dispatch({ type: types.DELETE_CONTACT, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

const addContact = (dispatch) => async (data) => {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('token');

  try {
    const response = await appApiClient.addSosContact(username, data, token);
    dispatch({ type: types.ADD_CONTACT, payload: response.data });
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
    dispatch({ type: types.EDIT_CONTACT, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export { getContacts, deleteContact, addContact, editContact };

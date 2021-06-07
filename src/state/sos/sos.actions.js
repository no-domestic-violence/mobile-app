/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import appApiClient from 'api/';
import { getUserSecureStorage } from 'helpers';
import types from './sos.types';

const getContacts = (dispatch) => async () => {
  try {
    const { username } = await getUserSecureStorage();
    const response = await appApiClient.getSosContacts(username);
    dispatch({
      type: types.GET_CONTACTS,
      payload: response.data.contacts,
    });
  } catch (error) {
    dispatch({
      type: types.ERROR,
      payload: error.response.data.message,
    });
  }
};

const deleteContact = (dispatch) => async ({ id }) => {
  const { username } = await getUserSecureStorage();
  try {
    const response = await appApiClient.deleteSosContact(username, id);
    dispatch({
      type: types.DELETE_CONTACT,
      payload: response.data.contacts,
    });
  } catch (error) {
    dispatch({
      type: types.ERROR,
      payload: error.response.data.message,
    });
  }
};

const addContact = (dispatch) => async (data) => {
  const { username } = await getUserSecureStorage();
  try {
    const response = await appApiClient.addSosContact(username, data);
    dispatch({ type: types.ADD_CONTACT, payload: response.data.contacts });
  } catch (error) {
    dispatch({
      type: types.ERROR,
      payload: error.response.data.message,
    });
  }
};

const editContact = (dispatch) => async ({ data, id }) => {
  const { username } = await getUserSecureStorage();
  try {
    const response = await appApiClient.editSosContact(username, data, id);
    dispatch({
      type: types.EDIT_CONTACT,
      payload: response.data.contacts,
    });
  } catch (error) {
    dispatch({
      type: types.ERROR,
      payload: error.response.data.message,
    });
  }
};

export { getContacts, deleteContact, addContact, editContact };

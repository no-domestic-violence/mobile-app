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
    // case ACTIONS.DELETE_CONTACT:
    //     return
    case ACTIONS.GET_CONTACTS:
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
};

const getContacts = (dispatch) => async () => {
  try {
    const username = await AsyncStorage.getItem('username');
    const response = await appApiClient.get(`/users/${username}/contacts`);
    dispatch({ type: ACTIONS.ADD_CONTACT, payload: response.data.contacts });
  } catch (error) {
    console.error(error);
  }
};

export const { Provider, Context } = createAppContext(
  sosReducer,
  {
    getContacts,
  },
  { contacts: [] },
);

// const saveContact = async () => {
//     const data = getValues();
//     await appApiClient
//       .patch(`/users/${state.username}/contacts/`, data)
//       .then((response) => {
//         alert(response.data);
//       })
//       .catch((e) => {
//         alert(e);
//       });
//     navigation.navigate('SosContactHome');
//   };

// const newContact = (dispatch) => async ({ name, phone, message}) => {
//     const response = await appApiClient
//     .patch(`/users/${state.username}/contacts/`, {
//         name,
//         phone,
//         message
//     })
//       .then((response) => {
//         alert(response.data);
//       })
//       .catch((e) => {
//         alert(e);
//       });
//     dispatch( { type: ACTIONS.ADD_CONTACT, payload: response.data });
// }

// const [ contact , dispatch ] = useReducer(sosReducer, [] )
// const [ name, setName ] = useState('')
// // dispatch: what we call to update the state

// function handleSubmit(){
//     dispatch({ type: ACTIONS.ADD_TODO})
// }

// return (
//     <>
//     <
// )

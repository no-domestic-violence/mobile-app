import sosReducer from './sos.reducer';
import * as types from './sos.types';

const mockFirstContact = {
  name: 'celeste',
  phone: '12341341234',
  message: 'hey',
};
const mockSecondContact = { name: 'jo', phone: '123431523', message: 'hello' };
const mockInitialState = { contacts: mockFirstContact };

describe('sos reducer', () => {
  it('should handle ADD_CONTACT', () => {
    const action = {
      type: types.ADD_CONTACT,
      payload: [mockFirstContact, mockSecondContact],
    };
    const expectedState = {
      contacts: [mockFirstContact, mockSecondContact],
    };
    expect(sosReducer(mockInitialState, action)).toEqual(expectedState);
  });
  it('should handle GET_CONTACTS', () => {
    const action = {
      type: types.GET_CONTACTS,
      payload: mockFirstContact,
    };
    const expectedState = {
      contacts: mockFirstContact,
    };
    expect(sosReducer([], action)).toEqual(expectedState);
  });
  it('should handle EDIT_CONTACT', () => {
    const action = {
      type: types.EDIT_CONTACT,
      payload: mockSecondContact,
    };
    const expectedState = { contacts: mockSecondContact };
    expect(sosReducer(mockInitialState, action)).toEqual(expectedState);
  });
  it('should handle DELETE_CONTACT', () => {
    const action = {
      type: types.DELETE_CONTACT,
      payload: null,
    };
    const expectedState = {
      contacts: null,
    };

    expect(sosReducer(mockInitialState, action)).toEqual(expectedState);
  });
  it('should handle ERROR', () => {
    const action = {
      type: types.ERROR,
      payload: 'error has occured',
    };
    const expectedState = {
      contacts: mockFirstContact,
      errorMessage: 'error has occured',
    };
    expect(sosReducer(mockInitialState, action)).toEqual(expectedState);
  });
});

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
    expect(
      sosReducer(mockInitialState, {
        type: types.ADD_CONTACT,
        payload: [mockFirstContact, mockSecondContact],
      })
    ).toEqual({
      contacts: [mockFirstContact, mockSecondContact],
    });
  });
  it('should handle GET_CONTACTS', () => {
    expect(
      sosReducer([], {
        type: types.GET_CONTACTS,
        payload: mockFirstContact,
      })
    ).toEqual({
      contacts: mockFirstContact,
    });
  });
  it('should handle EDIT_CONTACT', () => {
    expect(
      sosReducer(mockInitialState, {
        type: types.EDIT_CONTACT,
        payload: mockSecondContact,
      })
    ).toEqual({ contacts: mockSecondContact });
  });
  it('should handle DELETE_CONTACT', () => {
    expect(
      sosReducer(mockInitialState, {
        type: types.DELETE_CONTACT,
        payload: null,
      })
    ).toEqual({
      contacts: null,
    });
  });
  it('should handle ERROR', () => {
    expect(
      sosReducer(mockInitialState, {
        type: types.ERROR,
        payload: 'error has occured',
      })
    ).toEqual({
      contacts: mockFirstContact,
      errorMessage: 'error has occured',
    });
  });
});

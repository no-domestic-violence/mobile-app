import locationReducer from './location.reducer';

const mockLocation = {
  coords: {
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: -1,
    heading: -1,
    latitude: 52.52,
    longitude: 13.405,
    speed: -1,
  },
  timestamp: 1619730336881.998,
};
const mockHotlinesList = [
  {
    _id: '5f9db611c7cc881787ba620b',
    city: 'Hamburg',
    country: 'Germany',
    organisation_name: 'Test name 2',
    phone: '+49 543 514 8358',
    website: 'www.help.de',
  },
  {
    _id: '5f9db611ceeec881787ba620b',
    city: 'Berlin',
    country: 'Germany',
    organisation_name: 'Test name 1',
    phone: '+49 543 514 8358',
    website: 'www.nodomesticviolence.de',
  },
];

export const mockSheltersList = [
  {
    place_name: 'Test name',
    address: 'Berlin, Turmstrasse, 0',
    contact_person: 'Test',
    phone: '+497777777777',
    longitude: 12.12,
    latitude: 13.13,
    description: 'Test description',
  },
  {
    place_name: 'Test name2',
    address: 'Berlin, Wicherstr, 10',
    contact_person: 'Test contact',
    phone: '+497777779999',
    longitude: 12.12,
    latitude: 13.13,
    description: 'Test description',
  },
];

describe('locationReducer', () => {
  const initialState = {
    currentLocation: null,
    sheltersList: [],
    hotlinesData: [],
  };
  const invalidAction = { type: 'INVALID_ACTION' };

  it('should return the initialState', () => {
    expect(locationReducer(initialState, invalidAction)).toEqual(initialState);
  });

  it('should handle the UPDATE_LOCATION action', () => {
    const action = { type: 'UPDATE_LOCATION', payload: mockLocation };
    const expectedState = { ...initialState, currentLocation: mockLocation };

    expect(locationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the SEARCH_HOTLINES action', () => {
    const action = { type: 'SEARCH_HOTLINES', payload: mockHotlinesList };
    const expectedState = { ...initialState, hotlinesData: mockHotlinesList };

    expect(locationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the FETCH_SHELTERS action', () => {
    const action = { type: 'FETCH_SHELTERS', payload: mockSheltersList };
    const expectedState = { ...initialState, sheltersList: mockSheltersList };

    expect(locationReducer(initialState, action)).toEqual(expectedState);
  });
});

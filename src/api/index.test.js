jest.unmock('axios');
import appApiClient, { apiInstance } from './index';
import MockAdapter from 'axios-mock-adapter';

describe('appApiClient', () => {
  const mockFMClient = new MockAdapter(apiInstance);

  beforeEach(async () => {
    mockFMClient.reset();
  });

  afterAll(() => {
    mockFMClient.restore();
  });

  it('should successfully fetch hotlines data by search param', async () => {
    //given
    const search = 'Berlin';
    const response = [
      {
        _id: '5f9db611c7cc881787ba620e',
        city: 'Berlin',
        country: 'Germany',
        organisation_name: "Nelson's Horsenettle",
        phone: '+49 543 513 8358',
        website: 'www.nelson.de',
        description: 'Everyday, 24/7',
      },
      {
        _id: '5f9db611c7cc881787ba620a',
        city: 'Berlin',
        country: 'Germany',
        organisation_name: 'Test name',
        phone: '+49 543 510 8358',
        website: 'www.test.de',
        description: 'Everyday, 24/7',
      },
      {
        _id: '5f9db611c7cc881787ba620b',
        city: 'Berlin',
        country: 'Germany',
        organisation_name: 'Test name 2',
        phone: '+49 543 514 8358',
        website: 'www.test2.de',
        description: 'Everyday, 24/7',
      },
    ];
    // when
    mockFMClient
      .onGet('/hotlines', { params: { searchTerm: search } })
      .reply(200, response);
    const hotlines = await appApiClient.getHotlinesData(search);
    //then
    expect(hotlines.data).toEqual(response);
  });

  it('should successfully fetch shelters data', async () => {
    //given
    const response = [
      {
        place_name: 'Test name',
        address: '10001, Berlin, TestStrasse, 1',
        contact_person: 'Jon Snow',
        phone: '+4900110000',
        locs: [12.2343, 13.7898],
      },
    ];
    // when
    mockFMClient.onGet('/shelters').reply(200, {
      data: response,
    });
    const shelters = await appApiClient.getSheltersData();
    //then
    expect(shelters.data.data).toEqual(response);
  });

  it('should successfully send user data on post to login endpoint', async () => {
    const email = 'test@test.com';
    const password = '12345678';
    //given
    const user = {
      username: 'Celeste',
      email,
      contacts: [{}],
      role: 'basic',
    };
    const response = {
      success: true,
      message: 'Logged in successfully !',
      token: 'TestToken121212',
      user,
    };
    // when
    mockFMClient.onPost('/login', { email, password }).reply(200, response);
    const actual = await appApiClient.loginUser(email, password);
    //then
    expect(actual.data).toEqual(response);
  });

  it('should successully get sos contacts with username and token', async () => {
    //given
    const username = 'celeste';
    const token = 'faketoken123456';
    const response = [
      {
        _id: '2f213dsafdsfasdfdas34e',
        name: 'Soyoon',
        phone: '012341235215',
        message: 'help',
      },
    ];
    mockFMClient.onGet(`/users/${username}/contacts`).reply(200, response, {
      headers: { 'auth-token': token },
    });
    //when
    const contacts = await appApiClient.getSosContacts(username, token);
    //then
    expect(contacts.data).toEqual(response);
  });
});

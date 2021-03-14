const hotlinesDataMock = [
  {
    _id: '5f9db611c7cc881787ba620e',
    city: 'Hamburg',
    country: 'Germany',
    organisation_name: "Nelson's Horsenettle",
    phone: '+49 543 513 8358',
  },
  {
    _id: '5f9db611c7cc881787ba620a',
    city: 'Hamburg',
    country: 'Germany',
    organisation_name: 'Test name',
    phone: '+49 543 510 8358',
  },
  {
    _id: '5f9db611c7cc881787ba620b',
    city: 'Hamburg',
    country: 'Germany',
    organisation_name: 'Test name 2',
    phone: '+49 543 514 8358',
  },
];

const sosContactsMock = [
  {
    _id: '2f213dsafdsfasdfdas34e',
    name: 'Soyoon',
    phone: '012341235215',
    message: 'help',
  },
];
// TODO: needs to be redone, not flexible test
describe('appApiClient', () => {
  const appApiClient = {
    getHotlinesData: jest.fn(() => Promise.resolve({ data: hotlinesDataMock })),
    getSosContact: jest.fn(() => Promise.resolve({ data: sosContactsMock })),
    addSosContact: jest.fn(() => Promise.resolve({ data: sosContactsMock })),
  };
  const username = 'celeste';
  const token = 'faketoken123456';

  it('get hotlines data by search param', async () => {
    const search = 'hamburg';
    const hotlinesData = await appApiClient.getHotlinesData(search);
    expect(appApiClient.getHotlinesData).toHaveBeenCalledTimes(1);
    expect(appApiClient.getHotlinesData).toHaveBeenCalledWith(search);
    expect(hotlinesData.data.length).toEqual(3);
  });
  it('gets sos contacts with username and token', async () => {
    const contacts = await appApiClient.getSosContact(username, token);
    expect(appApiClient.getSosContact).toHaveBeenCalledTimes(1);
    expect(appApiClient.getSosContact).toHaveBeenCalledWith(username, token);
    expect(contacts.data.length).toEqual(1);
  });
  it('adds an sos contact with username and token', async () => {
    const newContact = {
      _id: '312343142341331423',
      name: 'newcontact',
      phone: '0123456',
      message: 'help',
    };
    await appApiClient.addSosContact(username, newContact, token);
    expect(appApiClient.addSosContact).toHaveBeenCalledTimes(1);
  });
  it('checks if addSosContact has successfully added a contact', async () => {
    const contacts = await appApiClient.getSosContact(username, token);
    expect(contacts.data.length).toEqual(2);
  });
});

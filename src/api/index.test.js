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
//TODO: needs to be redone, not flexible test
describe('appApiClient', () => {
  const appApiClient = {
    getHotlinesData: jest.fn(() => Promise.resolve({ data: hotlinesDataMock }))
  };
 it('get hotlines data by search param', async() => {
    const search = 'hamburg';
    const hotlinesData = await appApiClient.getHotlinesData(search);
    expect(appApiClient.getHotlinesData).toHaveBeenCalledTimes(1);
    expect(appApiClient.getHotlinesData).toHaveBeenCalledWith(search);
    expect(hotlinesData.data.length).toEqual(3);
 });
});

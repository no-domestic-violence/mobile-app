import axios from './appApiClient';
import { getHotlinesData } from './index';

jest.mock('./appApiClient', () => {
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
  return {
    baseURL: 'https://pool-api-mobile.herokuapp.com/api',
    get: jest.fn().mockResolvedValue({
      data: hotlinesDataMock,
    }),
  };
});
describe('getHotlinesData by search parameter', () => {
  afterEach(() => jest.resetAllMocks());
  it('fetches hotlines by search param', async () => {
    const search = 'hamburg';
    const hotlinesData = await getHotlinesData(search);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/hotlines', {
      params: { searchTerm: search },
    });
    expect(hotlinesData.data.length).toEqual(3);
  });

  it('resolves with error', async () => {
    const serverError = new Error('Some network error');
    axios.get.mockRejectedValueOnce(Promise.reject(serverError));
    try {
      await getHotlinesData('?');
    } catch (err) {
      expect(console.error).toBeCalled();
      expect(err).toEqual(serverError);
    }
  });
});

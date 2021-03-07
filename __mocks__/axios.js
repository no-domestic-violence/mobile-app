const mockAxios = jest.genMockFromModule('axios');

// TODO: to check if needed, in case of using moxios
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;

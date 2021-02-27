import appApiClient from './appApiClient';

const getHotlinesData = async (search) => {
  try {
    const response =  await appApiClient.get('/hotlines', {
      params: { searchTerm: search },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
// eslint-disable-next-line
export { getHotlinesData };

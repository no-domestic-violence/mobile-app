import appApiClient from './appApiClient';

const getHotlinesData = async (setDataSource, setLoading, search, inputRef) => {
  try {
    const response = await appApiClient.get('/hotlines', {
      params: { searchTerm: search },
    });
    setDataSource([...response.data]);
    setLoading(false);
    inputRef.current.focus();
  } catch (error) {
    console.error(error);
  }
};
// eslint-disable-next-line
export { getHotlinesData };

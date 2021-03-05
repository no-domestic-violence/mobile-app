import axios from 'axios';
import baseURL from '../config';

export default appApiClient = axios.create({
  baseURL,
});

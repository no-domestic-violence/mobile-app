/* eslint-disable no-param-reassign */
import axios from 'axios';
import baseURL from '../config';

const apiInstance = axios.create({
  baseURL,
});

export default apiInstance;

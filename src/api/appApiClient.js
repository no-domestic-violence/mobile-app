import axios from 'axios';

// TODO: configure production when we have it
export default axios.create({
  baseURL: 'http://localhost:3001',
});

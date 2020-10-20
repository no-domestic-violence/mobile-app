import axios from 'axios';

// we can use ngrok here for different networks
// TODO: configure localhost when we have backend
export default axios.create({
  baseURL: 'http://localhost:3001',
});

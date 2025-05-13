import axios from 'axios';

const Axios = axios.create({
  baseURL: `http://localhost:4000/api`, // Ensure this matches your backend server's URL and port
  headers: {
    'Content-Type': `application/json`,
  },
  timeout: 10000,
});

export default Axios;

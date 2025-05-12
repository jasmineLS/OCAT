import axios from 'axios';

const Axios = axios.create({
  baseURL: `http://localhost:3000/api`, // Ensure this matches your backend base URL
  timeout: 5000, // Optional: Set a timeout for requests
});

export default Axios;

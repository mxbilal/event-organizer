import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URI = process.env.REACT_APP_BASE_URI;

const Axios = axios.create({
    //baseURL: BASE_URL+BASE_URI,
    timeout: 500000,
});

export default Axios;
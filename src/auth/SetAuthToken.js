import Axios from './index';

const setAuthToken = token => {
    if (token) {
        // Apply authorization token to every request if logged in
        Axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
    } else {
        // Delete auth header
        delete Axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;
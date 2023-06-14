import Axios from "../auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URI = process.env.REACT_APP_BASE_URI;

export const SignIn =  async (credientials) => {

  const reponse = await Axios.post(`${BASE_URL + BASE_URI}/auth/login/`,credientials)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data.Error;
                }
            });
        return reponse; 
};

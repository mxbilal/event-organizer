import Axios from "../auth";
import setAuthToken from "./SetAuthToken"

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URI = process.env.REACT_APP_BASE_URI;

export const RefreshToken = () => {
    const token =localStorage.getItem("rf_token")
   token !== undefined && Axios.post(`${BASE_URL + BASE_URI}/auth/token/refresh/`,{
     refresh : token
   })
            .then((response) =>  {
                 localStorage.setItem("token",response.data.access)
                 setAuthToken(response.data.access)
            })
            .catch((error) => console.log("errrr",error));
}


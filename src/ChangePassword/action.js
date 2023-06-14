import Axios from "../auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URI = process.env.REACT_APP_BASE_URI;

export const ChangePasswordCall = async (password1, oldPassword) => {
  const reponse = await Axios.post(
    `${BASE_URL + BASE_URI}/auth/password/change/`,
    {
      new_password1: password1,
      new_password2: password1,
      old_password: oldPassword,
    }
  )
  return reponse;
};

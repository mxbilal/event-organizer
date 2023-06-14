import Axios from "../auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URI = process.env.REACT_APP_BASE_URI;

export const ForgotPasswordCall =  async (email) => {

  const reponse = await Axios.post(`${BASE_URL + BASE_URI}/auth/password/reset/`,{
    email : email,
  })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data.Error;
                }
            });
        return reponse; 
};

export const ResetPasswordConfirm = async(password, uId, token) => {
    try{
      const response = await Axios.post(
        `${BASE_URL + BASE_URI}/auth/password/reset/confirm/`,
        {
          new_password1: password,
          new_password2: password,
          uid: uId,
          token: token,
        }
      );
      return response
    }
    catch(e){
      return e.response.data.error
    }
}

export const AccountVerify = async(uId, token) => {
  try {
    const response = await Axios.post(
      `${BASE_URL + BASE_URI}/auth/user/verified/`,
      {
        uid: parseInt(uId),
        token: token,
      }
    );
    return response
  }
  catch(e){
    return e.response.data.error
  }
}

export const AccountConfirm = async(uId, token, password, email) => {
  const response = await Axios.post(
    `${BASE_URL + BASE_URI}/auth/user/confirm/`,
    {
      new_password1: password,
      new_password2: password,
      uid: uId,
      token: token,
      email: email,
    }
  );
  return response
}

import Axios from "../auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URI = process.env.REACT_APP_BASE_URI;

export const getEventAttendees = async (eventId, offset, limit) => {
  // const userId = localStorage.getItem("userDetail").user.pk
  //   const response = await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/people/?offset=${offset}&limit=${limit}`)
  const response = await Axios.get(
    `${BASE_URL + BASE_URI}/base/events/${eventId}/people/`
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data.Error;
      }
    });
  return response;
};

export const getAttendeeProfile = async (profileId) => {
  try {
    return await Axios.get(`${BASE_URL + BASE_URI}/base/people/${profileId}/`);
  } catch (e) {
    console.log("profile err: ", e);
  }
};

export const getFilterAttendees = async (eventId, filterChar) => {
  try {
    return await Axios.get(
      `${
        BASE_URL + BASE_URI
      }/base/events/${eventId}/people/?search=${filterChar}`
    );
  } catch (e) {
    console.log("people search err: ", e);
  }
};

// order by
export const getSortedAttendees = async (eventId, sortBy) => {
  try {
    return await Axios.get(
      `${BASE_URL + BASE_URI}/base/events/${eventId}/people/?order=${sortBy}`
    );
  } catch (e) {
    console.log("people order err: ", e);
  }
};

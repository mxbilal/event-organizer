//import { fetchAction } from "../fetchAction";
import Axios from "../auth";

const fetchAction = (action) => {
  const { endpoint, payload, verb } = action;
  const result = new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: verb,
      body: payload,
    })
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => console.log("error: ", error));
  });
  return result;
};

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URI = process.env.REACT_APP_BASE_URI;

export const getBannerEvents = ({ callback }) => {
  return fetchAction({
    endpoint: `${BASE_URL + BASE_URI}/base/events/highlight/`,
  }).then((res) => callback(res));
};

export const getUpcomingEvents = ({ offset, limit, callback }) => {
  return fetchAction({
    endpoint: `${
      BASE_URL + BASE_URI
    }/base/events/upcoming/?offset=${offset}&limit=${limit}`,
  }).then((res) => callback(res));
};

export const getRecentEvents = ({ offset, limit, callback }) => {
  return fetchAction({
    endpoint: `${
      BASE_URL + BASE_URI
    }/base/events/recent/?offset=${offset}&limit=${limit}`,
  }).then((res) => callback(res));
};

export const getAboutUs = ({ callback }) => {
  return fetchAction({
    endpoint: `${BASE_URL + BASE_URI}/base/about_us/`,
  }).then((res) => callback(res));
};

export const getEventTypes = ({ callback }) => {
  return fetchAction({
    endpoint: `${BASE_URL + BASE_URI}/base/choices/event_types/`,
  }).then((res) => callback(res));
};

export const getPeopleSpeakers = ({ id, callback }) => {
  return fetchAction({
    endpoint: `${BASE_URL + BASE_URI}/base/events/${id}/people/speakers/`,
  }).then((res) => callback(res));
};

export const getFilterUpcoming = ({ eventId, offset, limit, callback }) => {
  return fetchAction({
    endpoint: `${
      BASE_URL + BASE_URI
    }/base/events/upcoming/?event_type=${eventId}&offset=${offset}&limit=${limit}`,
  }).then((res) => callback(res));
};
export const getFilterRecent = ({ eventId, offset, limit, callback }) => {
  return fetchAction({
    endpoint: `${
      BASE_URL + BASE_URI
    }/base/events/recent/?event_type=${eventId}&offset=${offset}&limit=${limit}`,
  }).then((res) => callback(res));
};

export const getSpeakerProfile = async (id) => {
  try {
    return await Axios.get(`${BASE_URL + BASE_URI}/base/people/${id}/`);
  } catch (e) {
    console.log("profile err: ", e);
  }
};

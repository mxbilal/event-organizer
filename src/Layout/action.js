import Axios from "../auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URI = process.env.REACT_APP_BASE_URI;

export const EventStream =  async (eventId) => {

  const reponse = await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/streams/`)
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

export const EventDesp = async (eventId) => {
    try{
        const response = await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/`)
    return response
    }
    catch(e) {
        return e.response.data.error
    }
}
export const getLivePoll = async (eventId) => {
    try{
        const response = await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/polls/live/`)
    return response
    }
    catch(e) {
        return e.response
    }
}

//add poll answer 
export const AddPollAnswer = async (eventId, pollId, item_id) => {
    try{
       return await Axios.post(`${BASE_URL + BASE_URI}/base/events/${eventId}/polls/${pollId}/vote/`,{
        item_id : item_id
       })
    }
    catch(e) {
        console.log("profile err: ",e)
    }
}
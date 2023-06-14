import Axios from "../auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URI = process.env.REACT_APP_BASE_URI;

//list
export const GetPollsList = async (eventId) => {
    try{
       return await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/polls/`)
    }
    catch(e) {
        console.log("profile err: ",e)
    }
}

//search polls
export const GetPollsBySearch = async (eventId,searchChar) => {
    try{
       return await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/polls/?search=${searchChar}`)
    }
    catch(e) {
        console.log("profile err: ",e)
    }
}
//filter polls list
export const GetFilterPollsList = async (eventId, filterBy) => {
    try{
       return await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/polls/${filterBy}`)
    }
    catch(e) {
        console.log("profile err: ",e)
    }
}

// answers
export const GetPollsListAnswers = async (eventId, pollId) => {
    try{
       return await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/polls/${pollId}/`)
    }
    catch(e) {
        console.log("profile err: ",e)
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
export const UpdatePollAnswer = async (eventId, pollId, voteId, item_id) => {
    try{
       return await Axios.put(`${BASE_URL + BASE_URI}/base/events/${eventId}/polls/${pollId}/vote/${voteId}/`,{
        item_id : item_id
       })
    }
    catch(e) {
        console.log("profile err: ",e)
    }
}
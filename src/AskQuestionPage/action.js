import Axios from "../auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URI = process.env.REACT_APP_BASE_URI;

export const GetQuestionsList = async (eventId) => {
    try{
       return await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/questions/audience/`)
    }
    catch(e) {
        console.log("profile err: ",e)
    }
}

//post question
export const POSTQuestion = async (eventId, postQuestion) => {
    try{
       return await Axios.post(`${BASE_URL + BASE_URI}/base/events/${eventId}/questions/`,{
        question : postQuestion
       })
    }
    catch(e) {
        console.log("profile err: ",e)
    }
}

// post question with slot
export const POSTQuestionWithSlot = async (eventId, postQuestion, slotId) => {
    try{
       return await Axios.post(
         `${BASE_URL + BASE_URI}/base/events/${eventId}/questions/`,
         {
           question: postQuestion,
           slot_id: slotId,
         }
       );
    }
    catch(e) {
        console.log("profile err: ",e)
    }
}

//delete
export const DeleteQuestion = async (eventId, deleteId) => {
    try{
       return await Axios.delete(`${BASE_URL + BASE_URI}/base/events/${eventId}/questions/${deleteId}/`)
    }
    catch(e) {
        console.log("profile err: ",e)
    }
}
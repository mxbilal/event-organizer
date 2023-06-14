import Axios from "../auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URI = process.env.REACT_APP_BASE_URI;

export const GetEventAgenda = async (eventId) => {
    try{
       return await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/agenda/`)
    }
    catch(e) {
        console.log("profile err: ",e)
    }
}

export const GetAgendaDetail = async (eventId, agendaId) => {
    try{
       return await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/agenda/${agendaId}/`)
    }
    catch(e) {
        console.log("agenda err: ",e)
    }
}

export const GetAgendDays = async (eventId) => {
    try{
       return await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/agenda/days/`)
    }
    catch(e) {
        console.log("agenda err: ",e)
    }
}

export const GetAgendaFilter = async (eventId, day_id) => {
    try{
       return await Axios.get(`${BASE_URL + BASE_URI}/base/events/${eventId}/agenda/?day_id=${day_id}`)
    }
    catch(e) {
        console.log("agenda err: ",e)
    }
}
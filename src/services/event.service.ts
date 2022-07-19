import axios from "axios"
import { EEvent } from "../models/domain"

class EventService {
    getAllByDate() {
        return axios.get(`https://oicartim04app.azurewebsites.net/api/Event/ByDateAll`)
    }
    getEventById(id: string) {
        return axios.get(`https://oicartim04app.azurewebsites.net/api/Event/${id}`)
    }

    getEventsByUserId(id: number) {
        return axios.get(`https://oicartim04app.azurewebsites.net/api/Event/ByUser/${id}`)
    }

    updateEvent(evnt: EEvent) {
        return axios.put(`https://oicartim04app.azurewebsites.net/api/Event/${evnt.id}`, evnt)
    }

    createEvent(evnt: EEvent) {
        return axios.post('https://oicartim04app.azurewebsites.net/api/Event', evnt)
    }

    deleteEvent(id: number) {
        return axios.delete(`https://oicartim04app.azurewebsites.net/api/Event/${id}`)
    }
}

export default new EventService()
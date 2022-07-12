import axios from "axios"
import { EEvent } from "../models/domain"

class EventService {
    getAllByDate() {
        return axios.get(`/api/Event/ByDateAll`)
    }
    getEventById(id: string) {
        return axios.get(`/api/Event/${id}`)
    }

    getEventsByUserId(id: number) {
        return axios.get(`/api/Event/ByUser/${id}`)
    }

    updateEvent(evnt: EEvent) {
        return axios.put(`/api/Event/${evnt.id}`, evnt)
    }

    createEvent(evnt: EEvent) {
        return axios.post('/api/Event', evnt)
    }

    deleteEvent(id: number) {
        return axios.delete(`/api/Event/${id}`)
    }
}

export default new EventService()
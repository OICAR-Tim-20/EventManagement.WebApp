import axios from "axios"
import { Location } from "../models/domain"

class LocationService {
    getAll() {
        return axios.get("/api/Location")
    }

    getLocationById(id: string) {
        return axios.get(`/api/Location/${id}`)
    }

    updateLocation(location: Location) {
        return axios.put(`/api/Location/${location.locationId}`, location)
    }

    createLocation(location: Location) {
        console.log(`from location service: ${location}`)
        return axios.post('/api/Location', location)
    }

    deleteLocation(id: number) {

    }
}

export default new LocationService()
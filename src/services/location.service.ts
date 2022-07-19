import axios from "axios"
import { Location } from "../models/domain"

class LocationService {
    getAll() {
        return axios.get(`https://oicartim04app.azurewebsites.net/api/Location`)
    }

    getLocationById(id: string) {
        return axios.get(`https://oicartim04app.azurewebsites.net/api/Location/${id}`)
    }

    updateLocation(location: Location) {
        return axios.put(`https://oicartim04app.azurewebsites.net/api/Location/${location.locationId}`, location)
    }

    createLocation(location: Location) {
        console.log(`from location service: ${location}`)
        return axios.post(`https://oicartim04app.azurewebsites.net/api/Location`, location)
    }

    deleteLocation(id: number) {

    }
}

export default new LocationService()
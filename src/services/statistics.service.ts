import axios from "axios"

class StatisticService {
    EventTypesByYear() {
        return axios.get(`https://oicartim04app.azurewebsites.net/api/Statistics/EventTypesByYear`)
    }
    AverageRatingsByEvent() {
        return axios.get(`https://oicartim04app.azurewebsites.net/api/Statistics/AverageRatingsByEvent`)
    }
    MostCommentedEvents() {
        return axios.get(`https://oicartim04app.azurewebsites.net/api/Statistics/MostCommentedEvents/5`)
    }
}

export default new StatisticService
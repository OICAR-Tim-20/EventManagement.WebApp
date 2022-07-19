import axios from "axios"

class StatisticService {
    EventTypesByYear() {
        return axios.get('/api/Statistics/EventTypesByYear')
    }
    AverageRatingsByEvent() {
        return axios.get('/api/Statistics/AverageRatingsByEvent')
    }
    MostCommentedEvents() {
        return axios.get('/api/Statistics/MostCommentedEvents/5')
    }
}

export default new StatisticService
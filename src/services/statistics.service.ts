import axios from "axios"

class StatisticService {
    EventTypesByYear() {
        return axios.get('/api/Statistics/EventTypesByYear')
    }
}

export default new StatisticService
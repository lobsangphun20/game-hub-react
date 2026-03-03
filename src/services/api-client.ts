import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: { key: '5686ff140eea4f648dbb4d2dd0980562'}

})
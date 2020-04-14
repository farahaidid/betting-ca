import axios from 'axios'

const baseURL = 'http://localhost:3500/api'

export const baseApi = axios.create({ baseURL })

export default { baseApi }
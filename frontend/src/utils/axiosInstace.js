import axios from 'axios'

const baseURL = 'http://localhost:5000/api/'

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.use(async req => {
  await axios.get('http://localhost:5000/api/session/refresh', { withCredentials: true })
  return req
})

export default axiosInstance

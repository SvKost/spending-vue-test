import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.spending.gov.ua/api/v2',
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Error occurred:', error)
    return Promise.reject(error)
  },
)

export default axiosInstance

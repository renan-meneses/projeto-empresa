import axios from 'axios'

const bff = axios.create({
  baseURL: '/bff',
  headers: {
    'Content-Type': 'application/json'
  }
})

bff.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default bff

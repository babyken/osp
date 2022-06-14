import axios from 'axios'

export const http = axios.create({
    baseURL: process.env.API_PRIVATE_ENDPOINT || 'http://localhost:3001'
})
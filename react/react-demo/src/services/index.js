import axios from 'axios'

import apis from './apis'

const http = axios.create({
    baseURL:apis.baseUrl
})

export const getTodos = ()=>{
    return http.get(apis.todo)
}
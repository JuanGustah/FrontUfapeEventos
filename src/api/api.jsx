import axios from 'axios';

const Api = axios.create({
    baseURL: "http://localhost:8081",
    headers: {'X-Custom-Header': 'foobar'}
})

export default Api;
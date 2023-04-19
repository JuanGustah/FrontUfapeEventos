import axios from 'axios';

const Api = axios.create({
    baseURL: "http://localhost:8081/" //link da api aqui
})

export default Api;
import axios from 'axios';
import React from 'react';

const Api = axios.create({
    baseURL: "http://localhost:8000/" //link da api aqui
})

export default Api;
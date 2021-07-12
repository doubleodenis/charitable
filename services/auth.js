import React from 'react';
import axios from 'axios';

import Constants from "expo-constants";
const { manifest } = Constants;

const host = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;
  
console.log('api', host)

const api = axios.create({
    baseURL: `http://${host}/api/auth`,
    // baseURL: `${host}/api/auth`,
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
});
api.interceptors.response.use(response => response.data,
    (error) => {
    console.log('error', error)
       return Promise.reject(error.data);}
    );

const login = (data) => {
    return api.post('/login', data);
}

const register = (data) => {
    return api.post('/register', data).then(res => res.data);
}

export default {
    login,
    register
}
import React from 'react';
import axios from 'axios';
import secureStorage from './secureStorage';
import Constants from "expo-constants";

const { manifest } = Constants;

const host = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;
  

const api = axios.create({
    baseURL: `http://${host}/api/auth`,
    // baseURL: `${host}/api/auth`,
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.response.use(response => response.data,
    (error) => {
        let data = JSON.stringify(error)
        console.log(error.response)
        return Promise.reject(error.response.data);
    });

const login = (data) => {
    return api.post('/login', data);
}

const register = (data) => {
    return api.post('/register', data);
}

const checkAuth = async () => {
    try {
        const token = await secureStorage.getValue('token');
        return api.get('/check', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    catch(err) {
        throw err;
    }
}

export default {
    login,
    register,
    checkAuth
}
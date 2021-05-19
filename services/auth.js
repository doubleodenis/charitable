import React from 'react';
import axios from 'axios';

let domain = "192.168.1.136"; //localhost
const api = axios.create({
    baseURL: `http://${domain}:3000/api/auth`,
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
});
api.interceptors.response.use(response => response.data,
    (error) => {
    //   const fallbackValue = [
    //     {userId: "Not authorized",id: "aerw15311sq",
    //      title: "Please try     again",completed: false}];
       return Promise.reject(error.response.data);}
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
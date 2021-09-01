import React from 'react';
import axios from 'axios';

import Constants from "expo-constants";
const { manifest } = Constants;

const host = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;
  
// let domain = "192.168.1.136"; //localhost
let domain = "192.168.100.121"; //marcels

const api = axios.create({
    baseURL: `http://${host}/api/mission`,
    // baseURL: `${host}/api/auth`,
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
});
api.interceptors.response.use(response => response.data,
    (error) => {
    //   const fallbackValue = [
    //     {userId: "Not authorized",id: "aerw15311sq",
    //      title: "Please try     again",completed: false}];
    console.log('error', error)
       return Promise.reject(error.data);}
    );

export const searchMission = (query) => {
    return api.get(`/${query}`).then(res => res.data)
}


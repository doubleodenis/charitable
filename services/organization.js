import React from 'react';
// import { AsyncStorage } from '@react-native-community';
import axios from 'axios';
let domain = "192.168.1.136"; //localhost
const api = axios.create({
    baseURL: `http://${domain}:3000/api/organization`,
    timeout: 3000,
    // headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.response.use(
    response => response.data,
    (error) => {
        return Promise.reject(error.response);
    }
);

const getCurrentOrganization = (token) => {
    return api.get(`/current`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.data);
}

const getOrganizations = () => {
    return api.get('/', {}).then(res => res.data);
}

const OrganizationApi = {
    getOrganizations,
    getCurrentOrganization
}

export default OrganizationApi;
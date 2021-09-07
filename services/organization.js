import React from 'react';
// import { AsyncStorage } from '@react-native-community';
import secureStorage from './secureStorage';

import axios from 'axios';
let domain = "192.168.1.136"; //localhost
const api = axios.create({
    baseURL: `http://${domain}:3000/api/organization`,
    timeout: 3000,
    // headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.response.use(
    response => {
        console.dir('API Response: ', response.data);
        
        if(response.data.status == 401)
            secureStorage.storeValue('token', null);

        return response.data;
    },
    (error) => {
        return Promise.reject(error.response);
    }
);

const getCurrentOrganization = async () => {
    try {
        const token = await secureStorage.getValue('token');
        return api.get(`/current`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.data);
    }
    catch(err) {
        throw err;
    }
    
}

const getOrganizations = () => {
    return api.get('/', {}).then(res => res.data);
}

const createOrganization = async (data) => {
    
    const token = await secureStorage.getValue('token');
    return api.post('/', data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.data)
}

const updateOrganization = async (id, data) => {
    
    const token = await secureStorage.getValue('token');
    return api.put(`/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.data)
}


const OrganizationApi = {
    getOrganizations,
    getCurrentOrganization,
    createOrganization,
    updateOrganization
}

export default OrganizationApi;
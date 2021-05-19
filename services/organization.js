import React from 'react';
// import { AsyncStorage } from '@react-native-community';
import axios from 'axios';
let domain = "192.168.1.136"; //localhost
const api = axios.create({
    baseURL: `http://${domain}:3000/api/organization`,
    timeout: 3000,
    // headers: {'X-Custom-Header': 'foobar'}
});

const getOrganizationByAccountId = (accountId) => {
    return api.get(`/?accountId=${accountId}`).then(res => res.data);
}

const getOrganizations = () => {
    return api.get('/', {}).then(res => res.data);
}

export default {
    getOrganizations,
    getOrganizationByAccountId
}
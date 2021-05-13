import React from 'react';
import { AsyncStorage } from '@react-native-community';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 3000,
    // headers: {'X-Custom-Header': 'foobar'}
});


const login = () => {
    return api.post('/login', {}).then(res => res.data);
}

export default {
    login
}
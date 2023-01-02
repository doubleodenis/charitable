import React from "react";
// import { AsyncStorage } from '@react-native-community';
import secureStorage from "./secureStorage";
import Constants from "expo-constants";
import axios from "axios";
import {GEOCODE_KEY} from '@env'

const { manifest } = Constants;

const host =
    typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
        : `api.example.com`;

const api = axios.create({
    baseURL: `http://${host}/api/organization`,
    timeout: 3000,
    // headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.response.use(
    (response) => {
        console.dir("API Response: ", response.data);

        if (response.data.status == 401)
            secureStorage.storeValue("token", null);

        return response.data;
    },
    (error) => {
        return Promise.reject(error.response);
    }
);

const getOrganizationById = (id) => {
    return api.get(`/${id}`, {}).then((res) => res.data);
};

const getCurrentOrganization = async () => {
    try {
        const token = await secureStorage.getValue("token");
        return api
            .get(`/current`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data);
    } catch (err) {
        throw err;
    }
};


const getOrganizations = () => {
    return api.get("/").then((res) => res.data);
};

const createOrganization = async (data) => {
    const token = await secureStorage.getValue("token");
    return api
        .post("/", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};

const updateOrganization = async (id, data) => {
    const token = await secureStorage.getValue("token");
    return api
        .put(`/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};

const uploadImages = async (organizationId, data) => {
    const token = await secureStorage.getValue("token");
    return api
        .post(`/${organizationId}/images`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};

const downloadImage = async (id, data) => {
    const token = await secureStorage.getValue("token");
    return api
        .delete(`/${id}/images`, {
            data: data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};

const geoCodeCoordinates = async (address) => {
    let parsedAddress = address.split(' ').join('+')
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${parsedAddress}&key=${GEOCODE_KEY}`)
    .then((response) =>
        response.data
    )
}

const OrganizationApi = {
    getOrganizationById,
    getOrganizations,
    getCurrentOrganization,
    createOrganization,
    updateOrganization,
    uploadImages,
    downloadImage,
    geoCodeCoordinates
};

export default OrganizationApi;

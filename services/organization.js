import React from "react";
// import { AsyncStorage } from '@react-native-community';
import secureStorage from "./secureStorage";
import Constants from "expo-constants";
import axios from "axios";

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

//Test API key
const geoCodeCoordinates = async (address) => {
    let parsedAddress = address.split(' ').join('+')
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${parsedAddress}&key=AIzaSyCbOjk7IjZccEp_ySbD7MGrS1bpiBljCyY`)
    .then((response) =>
        response.data.results[0].geometry.location
    )
    // .catch(error => {
    //     console.log(error);
    // });
}

const OrganizationApi = {
    getOrganizationById,
    getOrganizations,
    getCurrentOrganization,
    createOrganization,
    updateOrganization,
    geoCodeCoordinates
};

export default OrganizationApi;

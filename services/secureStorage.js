import React from 'react';
import * as SecureStore from 'expo-secure-store';

/**
 * Stores values in secure storage.
 * @param {String} key 
 * @param {*} value 
 */
async function storeValue(key, value) {
    await SecureStore.setItemAsync(key, value);
}

/**
 * Promise to return value or not
 * @param {*} key 
 * @returns Value for the key in storage
 */
const getValue = (key) => new Promise(async (resolve, reject) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      resolve(result);
    } else {
      reject('No values stored under that key.');
    }
})



export default {
    storeValue,
    getValue

}
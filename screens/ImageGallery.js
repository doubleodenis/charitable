import React, { useEffect, useLayoutEffect, useState } from "react";

import { View, StyleSheet } from 'react-native';
import GridImageView from 'react-native-grid-image-viewer';
import OrganizationApi from "../services/organization";
import IconButton from "../components/IconButton";
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from 'react-native-flash-message';
const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
};
// https://docs.expo.dev/versions/latest/sdk/imagepicker/
const ImageGallery = ({ route, navigation }) => {
    const [images, setImages] = useState([]);
    const [id, setId] = useState(null);

    useEffect(() => {
        (async () => {
            
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                showMessage({
                    message: "Cannot access photos without photo library access.",
                    type: "danger",
                    duration: 5000 
                })
            }
          }
        })();
    }, []);

    useEffect(() => {
        
        const { organization } = route.params;
        setImages(organization.images.map(obj => obj.fileLink));
        setId(organization._id);

    }, [route]);

    useLayoutEffect(() => {
        // const handleUpload = () => {
        //     launchImageLibrary({ mediaType: 'photo', maxWidth: 500, minWidth: 500 }, response => {
        //         if(response.didCancel) {
        //             return;
        //         }

        //         
        //     })
        // }

        navigation.setOptions({
            headerRight: () => <IconButton 
                style={{ paddingRight: 15 }} 
                iconStyle={{ fontSize: 20, color: '#9B9B9B' }}
                onPress={pickImage}
                icon='plus'
            />,
        })
    }, [navigation, images])
    
        
    const pickImage = async () => {
        //May need to "upgrade" to expo-image-picker-multiple (UI is a lil worse though)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true //not supported for mobile,
        });

        handleImagePicked(result);
    };

    const handleImagePicked = async (pickerResult) => {
        try {
            console.log(pickerResult);
            if (pickerResult.cancelled) {
                console.log('Upload cancelled');
                return;
            } else {
                // setPercentage(0);
                const img = await fetchImageFromUri(pickerResult.uri);
                // console.log(JSON.stringify(img));
                await uploadImage(img);
                // downloadImage(uploadUrl);
            }
        } catch (e) {
            console.log(e);
            showMessage({
                message: e,
                type: "danger",
                duration: 5000
            });
        }
    };
    
    const uploadImage = (file) => {
        let formData = new FormData();
        formData.append('photos', [file]);

        OrganizationApi.uploadImages(id, file).then(res => {
            console.log(res);
            let arr = res.map(obj => obj.fileLink);
            setImages(arr);
        })
        .catch(err => {
            console.log('uploading images err', err);

            showMessage({
                message: err ? err.message : "Error uploading images",
                type: "danger",
                duration: 5000
            });
        });
    }
    return (
        <View style={styles.container}>
            <GridImageView data={images} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default ImageGallery;
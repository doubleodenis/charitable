import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const HeaderSettingsButton = () => {
    let navigation = useNavigation();
    return  (
        <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => {
            navigation.navigate('VendorPageSettings');
        }}>
            <Icon title="Settings" name="gear" size={30} color="#9B9B9B" />
        </TouchableOpacity>
    )
}

export default HeaderSettingsButton;
import React from "react";
import { TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const IconButton = ({buttonStyle, iconStyle, onPress, icon}) => {
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Icon name={icon} color="#900" style={iconStyle}/>
        </TouchableOpacity>
    );
};

export default IconButton;

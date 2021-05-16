import React from "react";
import { TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const IconButton = ({style, iconStyle, onPress, icon}) => {
    return (
        <TouchableOpacity style={[{justifyContent: 'center', alignItems: 'center'}, style]} onPress={onPress}>
            <Icon name={icon} style={iconStyle? iconStyle : style}/>
        </TouchableOpacity>
    );
};

export default IconButton;

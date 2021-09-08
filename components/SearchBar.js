import React, {useState, useEffect, useRef} from 'react'
import { Animated, Easing, View, StyleSheet, TextInput, Keyboard } from "react-native";  
import DisplayButton from './DisplayButton'
import IconButton from './IconButton'
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({searching, setSearching, searchQuery, setSearchQuery, setSearchPressed}) => {
    const shrinkAnim = useRef(new Animated.Value(100)).current
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        playAnim()
    }, [searching]);

    const playAnim = () => {
        let shrinkGoal = searching ? 85 : 100
        let fadeGoal = searching ? 1 : 0

        Animated.stagger(200, [
            Animated.timing(
                shrinkAnim,
                {
                  toValue: shrinkGoal,
                  duration: 250,
                  useNativeDriver: false
                }
            ),
            Animated.timing(
                fadeAnim,
                {
                  toValue: fadeGoal,
                  duration: 150,
                  easing: Easing.quad,
                  useNativeDriver: false
                }
            )
        ]).start();
    }

    return (
        <View style={{flexDirection: 'row', marginTop: 25, alignItems: 'center'}}>
        <Animated.View 
            style={[
                styles.searchContainer, 
                {width: shrinkAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                })} 
            ]}>
            <Icon name='search' style={styles.searchIcon}></Icon>
            <TextInput
                style={styles.input}
                placeholder={searching? 'Search' : 'Search for items or missions'}
                onFocus={() => {setSearching(true);}}
                returnKeyType='search'
                onSubmitEditing = {()=>{setSearchPressed(true); Keyboard.dismiss();}}
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
                autoCorrect={false}
            />
            {searchQuery.length > 0 &&
                <IconButton 
                    style={styles.clearButton} 
                    iconStyle={styles.clearIcon}
                    onPress={() => setSearchQuery('')}
                    icon='times-circle'
                />
            }
        </Animated.View>
        {searching? 
            <Animated.View style={{opacity: fadeAnim}}>
                <DisplayButton buttonStyle={{backgroundColor: 'none'}} onPress={() => {setSearching(false); setSearchQuery(''); Keyboard.dismiss()}}>Close</DisplayButton>
            </Animated.View>
        :
            null
        }
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        color: '#565656',
        lineHeight: 18,
        paddingVertical: 0,
    },
    searchContainer: {
        padding: 5,
        height: 35,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D77944',
        borderRadius: 10,
        flexDirection: 'row',
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    clearButton: {
        marginLeft: 'auto',
        height: 30,
        width: 25
    },
    clearIcon:{
        fontSize: 20,
        color: '#AEAEAE',
    },
    searchIcon: {
        fontSize: 14,
        color: '#AEAEAE',
        marginRight: 5,
        marginLeft: 3
    }
});
export default SearchBar;
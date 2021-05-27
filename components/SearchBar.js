import React, {useState, useEffect, useRef} from 'react'
import { Animated, Easing, View, StyleSheet, TextInput, Keyboard } from "react-native";  
import DisplayButton from './DisplayButton'

const SearchBar = ({searching, setSearching, searchQuery, setSearchQuery}) => {
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
            <TextInput
                style={styles.input}
                placeholder={searching? 'Search' : 'Search for items or mission statements'}
                onFocus={() => {setSearching(true);}}
                returnKeyType='search'
                onSubmitEditing = {()=>Keyboard.dismiss()}
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
            />
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
        width: '100%',
        color: '#565656'
    },
    searchContainer: {
        padding: 5,
        height: 35,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D77944',
        borderRadius: 10,
        flexDirection: 'row',
        marginRight: 10
    },
});
export default SearchBar;
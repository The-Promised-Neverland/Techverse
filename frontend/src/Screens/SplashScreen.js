import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import splash from '../Images/splash.gif'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
    const navigation = useNavigation();


    const setup = async () => {
        const email = await AsyncStorage.getItem('email');
        if(email){
            navigation.navigate('HomeScreen');
        }
        else{
            navigation.navigate('LoginScreen');
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setup();
        }, 3000);

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={splash} />
            <Text>Welcome to AnimeWorld...</Text>
        </View> 
    );
}

export default SplashScreen;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { IAppleUser } from '../../types/IAppleUser';
import axios from "axios"
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Navigation';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { CheckAccessToken } from '../../components/auth/CheckAccessToken';
import { GetUserData } from '../../api/GetUserData';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'signup'>

export default function AppleSignIn(): JSX.Element{
    const [isAppleAvailable, setIsAppleAvailable] = useState<boolean>(false);
    const [appleCredentials, setAppleCredentials] = useState<IAppleUser>();

    async function saveToSecureStorage(key: string, value: string): Promise<void> {
        await SecureStore.setItemAsync(key, value);
      };

    async function saveRefreshToSecureStorage(key: string, value: string): Promise<void> {
        await SecureStore.setItemAsync(key, value);
      };

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    console.log("Apple credential state: ", appleCredentials)
    //Check if sign up with apple is available on device
    useEffect(() => {
        async function checkIsAppleAvailable(): Promise<void>{
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            setIsAppleAvailable(isAvailable)
        }
        checkIsAppleAvailable();
    }, []);

    const appleSignInButton = ():JSX.Element => {
        return(
            <AppleAuthentication.AppleAuthenticationButton 
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                onPress={signin}
                style={styles.appleBtn}
                cornerRadius={20}
                />
        )
    };

    const signin = async (): Promise<void> => {
        try {
            const credentials = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });
            console.log("Apple credentials: ", credentials)
            if(await getCredentialState(credentials.user)){
                // setAppleCredentials({
                //     name: credentials.fullName?.givenName,
                //     email: credentials.email,
                //     identityToken: credentials.identityToken,
                //     userId: credentials.user
                // });
                axios.post("http://192.168.1.103:3000/login/apple", {data: credentials.user})
                .then(resp => {
                    const accessToken = "AccessToken";
                    const refreshToken = "RefreshToken";
                    saveToSecureStorage(accessToken, resp.data.accessToken)
                    saveRefreshToSecureStorage(refreshToken, resp.data.refreshToken)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${resp.data.accessToken}`;
                    GetUserData();
                    navigation.navigate('home')
                })
                console.log("Palauttaa true")
                // navigation.navigate("createUsername", {
                //     userId: credentials.user
                // })
            } else {
                console.log("Palauttaa false")
            }
        } catch (error: any) {
            if(error.code === "ERR_REQUEST_CANCELED"){
                console.log("Login cancelled: ", error)
            } else {
                console.log("Error when sign in: ", error)
            }
        }
    };

    //Check if user is apple user
    const getCredentialState = async (userId: string): Promise<boolean> => {
        const credentialState = await AppleAuthentication.getCredentialStateAsync(userId)
        if(credentialState === 1){
            console.log(credentialState)
            return true
        } else {
            console.log("Käyttäjää ei löydy", credentialState)
            return false
        }
    };
    return(
        <View style={styles.container}>
            {
                isAppleAvailable ? 
                appleSignInButton() :
                <View></View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    appleBtn: {
        width: 250,
        height: 50
    }
})
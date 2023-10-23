import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { IAppleUser } from '../../types/IAppleUser';

export default function AppleSignUp(): JSX.Element{
    const [isAppleAvailable, setIsAppleAvailable] = useState<boolean>(false);
    const [appleCredentials, setAppleCredentials] = useState<IAppleUser>();

    console.log("Apple credential state: ", appleCredentials)
    useEffect(() => {
        async function checkIsAppleAvailable(): Promise<void>{
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            setIsAppleAvailable(isAvailable)
        }
        checkIsAppleAvailable();
    }, []);

    const appleSignUpButton = ():JSX.Element => {
        return(
            <AppleAuthentication.AppleAuthenticationButton 
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                onPress={signup}
                style={styles.appleBtn}
                cornerRadius={20}
                />
        )
    };

    const signup = async (): Promise<void> => {
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
                console.log("Palauttaa true")
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
                appleSignUpButton() :
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
import React from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Navigation";
import { BottomTabParamList } from "../../navigation/BottomTabsNavigation";
import { GetUserData } from "../../api/GetUserData";
import { CheckPendingFriendRequests } from "../notification/helperFunction/CheckPendingFriendRequests";

async function saveToSecureStorage(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
};

export async function CheckAccessToken(){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    let accessToken = await SecureStore.getItemAsync("AccessToken");
    let refreshToken = await SecureStore.getItemAsync("RefreshToken");
        
    //If access token is found set headers and fetch user data
    if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        await axios.post("http://192.168.1.103:3000/user/profile")
        .then(async response => {
            const {username, error, message, id} = response.data;
            console.log("Onko username: ", username)
            console.log("Onko id: ", id)
            if(error){
                await axios.post("http://192.168.1.103:3000/new/new-access", {refreshToken: refreshToken})
                .then(async res => {
                    const {error, accessToken, message} = res.data;
                    console.log("Success: ", accessToken, message)
                    const newAccessToken = "AccessToken";
                    saveToSecureStorage(newAccessToken, accessToken)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    //Tee uusi then koska tarvitsee lähettää uusi pyyntö serverille uudella access tokenilla jotta saat käyttäjän tiedot
                    GetUserData();
                    navigation.navigate("home")
                    }).catch(err => {
                        console.log("Error in spalsh screen setting header and navigate home screen: ", err)
                        navigation.navigate('login')
                    })
                    } else {
                        const {username, error, message} = response.data;
                        GetUserData();
                        if(accessToken)
                        navigation.navigate("home")
                    }

                    }).catch(err => {
                        console.log("Error splash screen axios: ", err)
                    })
            } else {
              navigation.navigate("signup")
            }
};

export async function CreateNewAccessToken(): Promise<boolean>{

    let accessToken = await SecureStore.getItemAsync("AccessToken");
    let refreshToken = await SecureStore.getItemAsync("RefreshToken");

    let returnType = false
    console.log("Return type ennen: ", returnType)
    await axios.post("http://192.168.1.103:3000/new/new-access", {refreshToken: refreshToken})
    .then(async res => {
        const {error, accessToken, message} = res.data;
        console.log("Success: ", accessToken, message)
        const newAccessToken = "AccessToken";
        saveToSecureStorage(newAccessToken, accessToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        if(error){
            returnType = false
        } else {
            returnType = true
        }
    }).catch(err => {
        console.log(err)
        returnType = false
    })
    console.log(returnType)
    return returnType
};
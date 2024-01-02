import React, {useCallback, useEffect, useState} from "react";
import { View, Text, Button, SafeAreaView, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/Navigation";
import { BottomTabParamList } from "../navigation/BottomTabsNavigation";
import * as SecureStore from 'expo-secure-store';
import { CreateNewAccessToken } from "../components/auth/CheckAccessToken";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons, FontAwesome5, Octicons } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import { HomeScreenParams } from "../navigation/HomeScreenStack";
import { theme } from "../theme/theme";
import userInfo from "../mobx/UserInfo";
import { observer } from "mobx-react";
import Notification from "../components/notification/Notification";

const UserData = () => {
    return(
        <View>
            <Text>{userInfo.currentUser.username}</Text>
        </View>
    )
};

const UserDataObserver = observer(UserData);

type HomeScreenProps = NativeStackScreenProps<BottomTabParamList, 'home'>
const {width, height} = Dimensions.get('window')
export default function HomeScreen(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenParams>>();
    const authNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    // useCallback(() => {
    //     const { accessToken, username } = route.params;
    //     console.log("Username: ", accessToken)
    // }, [])
    
    // console.log("Username: ", username)
    const deleteSecureStorage = async () => {
        try {
            await SecureStore.deleteItemAsync("AccessToken")
            await SecureStore.deleteItemAsync("AccessToken")
            
            authNav.navigate("signup")
        } catch (error) {
            console.log("Logout error in homescreen: ", error)
        }
    }

    // const responseTest = async () => {
    //     await axios.post("http://192.168.1.103:3000/user/profile")
    //     .then(async response => {
    //         const {username, error, message} = response.data
    //         console.log("Testi resp: ", username)
    //         console.log("Error testi: ", error)
    //         console.log("Error message: ", message)
    //         if(error){
    //             //Access token invalid or expired
    //             if(await CreateNewAccessToken()){
    //                 //New access token created succesfully
    //                 console.log("Onnistu if")
    //             } else {
    //                 //Could not create new access token
    //                 navigation.navigate("signup")
    //             }
    //         } else{
    //             //Access Token is still active
    //             console.log("Access toke stil active")
    //         }
    //     }).catch(err => {
    //         console.log("Error testi Homescreen: ", err)
    //     })
    // };
    return(
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <View style={styles.imageCont}></View>
                <View style={styles.headerBackground}>
                    
                </View>
                <Button title="Log out" onPress={() => deleteSecureStorage()}></Button>
                <View>
                    <UserDataObserver />
                </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 50}}>
                <View style={styles.upperCont}>
                    <TouchableOpacity 
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate("favourites")}
                    >
                        <AntDesign 
                        name="heart" 
                        size={20} 
                        color={'black'}
                        />
                        <Text>Favourites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate("groceryStack")}
                    >
                        <Octicons 
                        name="checklist" 
                        size={20} 
                        color="black" 
                        />
                        <Text>Grocery List</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lowerCont}>
                    <TouchableOpacity 
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('mealPlanner')}
                    >
                        <MaterialCommunityIcons 
                        name="calendar-clock" 
                        size={20} 
                        color={'black'} 
                        
                        />
                        <Text>Meal Planner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('friends')}
                    >
                        <Notification />
                        <FontAwesome5 
                        name="user-friends" 
                        size={20} 
                        color={'black'} 
                        />
                        <Text>Friends</Text>
                    </TouchableOpacity>
                </View>
            </View>          
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,    
    },
    imageCont: {
        position: 'absolute',
        zIndex: 2,
        top: 100,
        borderColor: 'black',
        borderWidth: 1,
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    iconContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 110,
        margin: 10
    },
    upperCont: {
        flexDirection: 'row'
    },
    lowerCont: {
        flexDirection: 'row'
    },
    headerBackground: {
        overflow: 'hidden',
        width: 100,
        height: 350,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: theme.mainColor,
        transform: [{ scaleX: 4.5 }],
    },
    
})
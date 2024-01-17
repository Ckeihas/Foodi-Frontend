import React, {useCallback, useEffect, useState} from "react";
import { View, Text, Button, SafeAreaView, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/Navigation";
import { BottomTabParamList } from "../navigation/BottomTabsNavigation";
import * as SecureStore from 'expo-secure-store';
import { CreateNewAccessToken } from "../components/auth/CheckAccessToken";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons, FontAwesome5, Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import { HomeScreenParams } from "../navigation/HomeScreenStack";
import { theme } from "../theme/theme";
import userInfo from "../mobx/UserInfo";
import { observer } from "mobx-react";
import Notification from "../components/notification/Notification";

const UserData = () => {
    return(
        <View>
            <Text style={styles.username}>@{userInfo.currentUser.username}</Text>
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
    console.log("HomeScreen")
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
        <>
        <View style={styles.container}>
            <View style={styles.notificationIcon}>
                <Feather name="bell" size={24} color="white" />
            </View>
            <View style={styles.settingsIcon}>
                <Ionicons name="settings" size={24} color="white" />
            </View>
        </View>
            <View style={styles.lowerSection}>
            <View style={{alignItems: 'center'}}>
                <View style={styles.imageCont}>
                    <Image source={require("../../assets/profile1.jpg")} style={styles.profilePicture}/>
                </View>
                {/* <Button title="Log out" onPress={() => deleteSecureStorage()}></Button> */}
                <View style={styles.usernameCont}>
                    <UserDataObserver />
                </View>
                
                <View style={styles.userStats}>
                    <View style={styles.stats}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statText}>Following</Text>
                    </View>

                    <View style={styles.seperatorLine}/>

                    <View style={styles.stats}>
                        <Text style={styles.statNumber}>338</Text>
                        <Text style={styles.statText}>Followers</Text>
                    </View>  

                    <View style={styles.seperatorLine}/>

                    <View style={styles.stats}>
                        <Text style={styles.statNumber}>8</Text>
                        <Text style={styles.statText}>Recipes</Text>
                    </View>  
                </View>
            </View>

                <View style={styles.upperCont}>
                    <TouchableOpacity 
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate("favourites")}
                    >
                        <AntDesign 
                        name="heart" 
                        size={23} 
                        color={'black'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate("groceryStack")}
                    >
                        <Octicons 
                        name="checklist" 
                        size={23} 
                        color="black" 
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('mealPlanner')}
                    >
                        <MaterialCommunityIcons 
                        name="calendar-clock" 
                        size={23} 
                        color={'black'} 
                        
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('friends')}
                    >
                        <Notification />
                        <FontAwesome5 
                        name="user-friends" 
                        size={23} 
                        color={'black'} 
                        />
                    </TouchableOpacity>
                </View>
            </View> 
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.mainColor,
        position: 'absolute',
        top: 0,
        width: width,
        height: height / 2,
    },
    imageCont: {
        position: 'absolute',
        zIndex: 2,
        top: -50
    },
    profilePicture: {
        borderColor: 'white',
        borderWidth: 3,
        width: 85,
        height: 85,
        borderRadius: 100,
    },
    usernameCont: {
        top: 50,
    },
    username: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18
    },
    iconContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        margin: 10,
        width: 60
    },
    upperCont: {
        flexDirection: 'row'
    },
    // headerBackground: {
    //     overflow: 'hidden',
    //     width: 100,
    //     height: 350,
    //     borderBottomLeftRadius: 50,
    //     borderBottomRightRadius: 50,
    //     backgroundColor: theme.mainColor,
    //     transform: [{ scaleX: 4.5 }],
    // },
    lowerSection: {
        zIndex: 2,
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: width,
        height: height / 1.4,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
    userStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 70
    },
    stats: {
        alignItems: 'center'
    },
    statNumber: {
        fontWeight: 'bold',
        color: 'black'
    },
    statText: {
        color: 'black',
        fontWeight: '500'
    },
    seperatorLine: {
        height: 30,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 10
    },
    notificationIcon: {
        left: width - 60,
        top: 60
    },
    settingsIcon: {
        top: 35,
        left: 40
    }
})
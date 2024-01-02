import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { UsersPostsParams } from "../navigation/UsersPostsStack";
import { theme } from "../theme/theme";
import userInfo from "../mobx/UserInfo";
import { arrayUnion, doc, onSnapshot, updateDoc, query, where, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

type ProfileScreenProps = NativeStackScreenProps<UsersPostsParams, 'profileScreen'>;
export default function ProfileScreen({route}: ProfileScreenProps): JSX.Element {
    const [pendingRequest, setPendingRequest] = useState<boolean>(false)
    const navigation = useNavigation<NativeStackNavigationProp<UsersPostsParams>>();
    const {id, username} = route.params;

    useEffect(() => {
        const IsFriendRequestSend = async () => {
            const foundUser = doc(db, 'users', id);
            const docSnap = await getDoc(foundUser);
    
            if(docSnap.exists()){
                const userIDToFind = "users/" + userInfo.currentUser.id;
                const findMe = docSnap.data().friendRequests
                findMe.forEach((element: any) => {
                    if(element.path === userIDToFind){
                        setPendingRequest(true)
                    } else {
                        setPendingRequest(false)
                    }
                });
            } else {
                console.log("Ei ö")
            }
            
        }
        IsFriendRequestSend();
    }, []);
    

    const SendFriendRequest = async () => {
        setPendingRequest(true)
        const foundUser = doc(db, 'users', id)
        await updateDoc(foundUser, {
            friendRequests: arrayUnion(doc(db, 'users/' + userInfo.currentUser.id))
        })
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
                <Image source={require("../../assets/food3.jpg")} style={styles.profileImage}/>
                <Text style={styles.username}>{username}</Text>

                <View style={styles.userStats}>
                    <View style={styles.stats}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statText}>Recipes</Text>
                    </View>

                    <View style={styles.seperatorLine}/>

                    <View style={styles.stats}>
                        <Text style={styles.statNumber}>338</Text>
                        <Text style={styles.statText}>Followers</Text>
                    </View>  

                    <View style={styles.seperatorLine}/>

                    <View style={styles.stats}>
                        <Text style={styles.statNumber}>8</Text>
                        <Text style={styles.statText}>Jotain?</Text>
                    </View>  
                </View>

                <View>
                    {
                        pendingRequest ? 
                        <View style={styles.waitingResponse}>
                            <Text style={styles.friendRequestText}>Waiting response...</Text>
                        </View>
                         : 
                        <TouchableOpacity style={styles.friendRequestBtn} onPress={() => SendFriendRequest()}>
                            <Text style={styles.friendRequestText}>Send friend request +</Text>
                        </TouchableOpacity>
                        
                    }
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginLeft: 20
    },
    profileInfo: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 100
    },
    username: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 15
    },
    userStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    stats: {
        alignItems: 'center'
    },
    statNumber: {
        fontWeight: 'bold'
    },
    statText: {
        color: 'gray',
        fontWeight: '500'
    },
    seperatorLine: {
        height: 30,
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 10
    },
    friendRequestBtn: {
        backgroundColor: theme.mainColor,
        padding: 15,
        borderRadius: 20,
        marginTop: 20
    },
    friendRequestText: {
        color: 'white',
        fontWeight: '500'
    },
    waitingResponse: {
        backgroundColor: 'gray',
        padding: 15,
        borderRadius: 20,
        marginTop: 20
    }
})
import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, FlatList } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeScreenParams } from "../../navigation/HomeScreenStack";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme/theme";
import FriendsFlatList from "../friends/FriendsFlatList";
import { CheckPendingFriendRequests } from "../notification/helperFunction/CheckPendingFriendRequests";
import { FriendsParams } from "../../navigation/FriendsStack";
import userInfo from "../../mobx/UserInfo";
import { observer } from "mobx-react";


type HomeScreenProps = NativeStackScreenProps<HomeScreenParams, 'friends'>
const { width, height } = Dimensions.get('window')

type RequestDataType = {
    username: string,
    amount: number
}

const latestFriendRequest = () => {
    const latestRequest = userInfo.friendRequests[userInfo.friendRequests.length - 1];
    return(
        <View style={styles.requestTextCont}>
            <Text style={styles.requestHeader}>Friend Requests</Text>
            <Text style={{color: 'gray', fontWeight: '500'}}>
                {
                    latestRequest ? 
                    userInfo.friendRequests.length > 1 ?
                    latestRequest.username + " " + " +" + (userInfo.friendRequests.length - 1) :
                    latestRequest.username
                    :
                    ""
                }
            </Text>
        </View>
    )
};

const LatestFriendRequestObserver = observer(latestFriendRequest)

export default function Friends(): JSX.Element{
    const [requestData, setRequestData] = useState<RequestDataType>();
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenProps>>();
    const friendsNav = useNavigation<NativeStackNavigationProp<FriendsParams>>();
    console.log("Friends")
    const latestRequest = userInfo.friendRequests[userInfo.friendRequests.length - 1];
    console.log("Ystävät: ", userInfo.friendRequests)
    console.log("Ystävät2: ", userInfo.friendRequests.length)
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerCont}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Friends</Text>
            </View>

            <TouchableOpacity style={styles.friendRequestCont} onPress={() => friendsNav.navigate("requests", {
                requests: userInfo.friendRequests
            })}>
                <View style={{flexDirection: 'row'}}>
                    <Image source={require("../../../assets/food5.jpg")} style={styles.imageStyle}/>
                    <LatestFriendRequestObserver />
                </View>
                <View style={styles.requestContRightSide}>
                    {
                        userInfo.friendRequests.length > 0 ?
                        <View style={styles.newRequestIndicator}></View> :
                        <View></View>
                    }
                    <MaterialIcons name="arrow-forward-ios" size={16} color="gray" />
                </View>
            </TouchableOpacity>

            <View style={styles.allFriendsCont}>
                <Text style={styles.allFriendsHeader}>All Friends</Text>
                <FriendsFlatList />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    headerCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        marginHorizontal: 20,
    },
    friendRequestCont: {
        borderBottomWidth: 0.5,
        borderColor: 'lightgray',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width
    },
    requestTextCont: {
        marginLeft: 20,
        marginBottom: 20
    },
    imageStyle: {
        width: 40,
        height: 40,
        borderRadius: 100,
        marginLeft: 20,
        marginBottom: 20
    },
    requestHeader: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    requestContRightSide: {
        marginBottom: 20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    newRequestIndicator: {
        width: 7,
        height: 7,
        borderRadius: 100,
        backgroundColor: theme.mainColor,
        marginRight: 20
    },
    allFriendsCont: {
        marginLeft: 20,
        marginTop: 20
    },
    allFriendsHeader: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});
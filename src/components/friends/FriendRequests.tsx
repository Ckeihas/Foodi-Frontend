import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Dimensions, Image } from "react-native";
import { FriendsParams } from "../../navigation/FriendsStack";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { theme } from "../../theme/theme";
import { arrayUnion, doc, onSnapshot, updateDoc, query, where, getDoc, deleteDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/config";
import userInfo from "../../mobx/UserInfo";

const { width, height } = Dimensions.get('window')
type FriendRequestProps = NativeStackScreenProps<FriendsParams, "requests">

type FlatListItemType = {
    id: string,
    username: string
}
export default function FriendRequests({route}: FriendRequestProps): JSX.Element{
    const navigation = useNavigation<NativeStackNavigationProp<FriendsParams>>();
    const { requests } = route.params;
    console.log(requests)

    const AcceptFriendRequest = async (id: string) => {
        const currentUser = doc(db, 'users', userInfo.currentUser.id)
        const requestUser = doc(db, 'users', id)
        await updateDoc(currentUser, {
            friends: arrayUnion(doc(db, 'users/' + id))
        })
        await updateDoc(requestUser, {
            friends: arrayUnion(doc(db, 'users/' + userInfo.currentUser.id))
        })
        await updateDoc(currentUser, {
            friendRequests: arrayRemove(doc(db, 'users/' + id))
        })
    }
    const RenderFlatListItem = ({item}: {item: FlatListItemType}) => {
        return(
            <View style={styles.requestCont}>
                <TouchableOpacity style={styles.requestCont}>
                    <Image source={require("../../../assets/food1.jpg")} style={styles.image}/>
                    <Text style={styles.username}>{item.username}</Text>
                </TouchableOpacity>

                <View style={styles.confirmDeleteCont}>
                    <TouchableOpacity style={styles.confirm} onPress={() => AcceptFriendRequest(item.id)}>
                        <Text style={styles.confirmText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>              
            </View>
        )
    }

    const ShowFlatList = () => {
        return(
            <FlatList 
            data={requests}
            renderItem={RenderFlatListItem}
            contentContainerStyle={styles.flatListStyle}
            />
        )
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Pending Requests</Text>
            </View>
            <ShowFlatList />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    flatListStyle: {  
        marginTop: 20
    },
    requestCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 10
    },
    confirmDeleteCont: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 13
    },
    deleteText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 13
    },
    confirm: {
        backgroundColor: theme.mainColor,
        padding: 6,
        borderRadius: 10,
        marginRight: 10,
        width: 70,
        alignItems: 'center'
    },
    delete: {
        backgroundColor: 'lightgray',
        padding: 6,
        borderRadius: 10,
        width: 70,
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    username: {
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 15
    },
})
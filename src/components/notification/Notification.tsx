import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme/theme";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import userInfo from "../../mobx/UserInfo";
import { observer } from "mobx-react";
import Friends from "../homeScreen/Friends";
import { CheckPendingFriendRequests } from "./helperFunction/CheckPendingFriendRequests";


interface UserId {
    id: string
}

type PendingRequestData = {
    username: string,
    amount: number
}
//Tästä johtu mobx virhe atm
function Notification(): JSX.Element{
    const [newRequest, setNewRequest] = useState<boolean>(false);
    
    // useEffect(() => {
    //     if(userInfo.currentUser.id)
    //     CheckPendingFriendRequests()

    // }, [userInfo.currentUser.id])
    
    return(
        <>
        {
            userInfo.friendRequests.length > 0 ? 
            <View style={styles.container}></View> :
            <View></View>
        }
        </>
        
    )
};

export default observer(Notification)
const styles = StyleSheet.create({
    container: {
        height: 12,
        width: 12,
        backgroundColor: theme.mainColor,
        position: 'absolute',
        borderRadius: 100,
        right: 30,
        top: 20
    }
})
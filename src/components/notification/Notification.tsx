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
function Notification(): JSX.Element{
    const [newRequest, setNewRequest] = useState<boolean>(false);
    
    useEffect(() => {
        if(userInfo.currentUser.id)
        CheckPendingFriendRequests()
        .then((data: any) => {
            if (data !== false) {
                console.log("Received data:", data); // Log the received data
                console.log("Username:", data.username); // Access username
                setNewRequest(true)
                // Access other properties as needed
                // Example: console.log("Email:", data.email);
            } else {
                console.log("No pending friend requests");
                setNewRequest(false)
            }
        })
        .catch((error) => {
            console.error("Error:", error); // Handle errors if any
        });
    }, [userInfo.currentUser.id])
    
    return(
        <>
        {
            newRequest ? 
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
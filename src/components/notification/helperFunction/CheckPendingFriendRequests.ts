import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import userInfo from "../../../mobx/UserInfo";
import { observer } from "mobx-react";
import React, { useCallback } from "react";

type RequestType = {
    id: string,
    username: string
}

export const CheckPendingFriendRequests = () => {
    console.log("MobX ID: ", userInfo.currentUser.id)
   
        if (userInfo.currentUser.id) {
            const currentUser = doc(db, 'users', userInfo.currentUser.id);
            const unsubscribe = onSnapshot(currentUser, async (snapshot): Promise<any> => {
                if (snapshot.exists() && snapshot.data().friendRequests.length > 0) {
                    const friendRequestArr = snapshot.data().friendRequests;
                    console.log("Kaverit array: ", friendRequestArr)
                    //Get users data from requests and get all requests
                    let allRequestArray: any = [];
                    friendRequestArr.forEach( async (request: any) => {
                        const refDoc = doc(db, request.path);
                        const refSnapshot = await getDoc(refDoc);
                        if(refSnapshot.exists()){
                            allRequestArray.push({
                                id: refSnapshot.id,
                                username: refSnapshot.data().username
                            })
                        }
                        if(allRequestArray.length === friendRequestArr.length){
                            userInfo.addFriendRequest(allRequestArray)
                        }
                    });
                    
                    //Get latest friend request and amount of requests
                    // const lastItem = friendRequestArr[friendRequestArr.length - 1];
                    // const refDoc = doc(db, lastItem.path);
                    // const refSnapshot = await getDoc(refDoc);
                    // if (refSnapshot.exists()) {
                    //     console.log("Array data: ", allRequestArray)
                    //     const data = {
                    //         username: refSnapshot.data().username,
                    //         amount: friendRequestArr.length
                    //     };
                    //     resolve(data);
                    //     return () => unsubscribe()
                    // }
                    return () => unsubscribe()
                } else {
                    return () => unsubscribe()
                }
            });
        } else {
            console.log("Ei ehtiny hakea");
        }
};

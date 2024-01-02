import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import userInfo from "../../../mobx/UserInfo";
import { observer } from "mobx-react";


export const CheckPendingFriendRequests = () => {
    console.log("MobX ID: ", userInfo.currentUser.id)
    return new Promise((resolve, reject) => {
        if (userInfo.currentUser.id) {
            const currentUser = doc(db, 'users', userInfo.currentUser.id);
            onSnapshot(currentUser, async (snapshot): Promise<any> => {
                if (snapshot.exists() && snapshot.data().friendRequests.length > 0) {
                    const friendRequestArr = snapshot.data().friendRequests;
                    const lastItem = friendRequestArr[friendRequestArr.length - 1];
                    const refDoc = doc(db, lastItem.path);
                    const refSnapshot = await getDoc(refDoc);
                    if (refSnapshot.exists()) {
                        const data = {
                            username: refSnapshot.data().username,
                            amount: friendRequestArr.length
                        };
                        resolve(data);
                    }
                } else {
                    resolve(false);
                }
            });
        } else {
            console.log("Ei ehtiny hakea");
            reject("User ID not found");
        }
    });
};

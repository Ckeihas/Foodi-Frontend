import React, { memo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { collection, query, where, onSnapshot, arrayRemove, arrayUnion, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import userInfo from "../../../mobx/UserInfo";
import IsPostLiked from "./IsPostLiked";
import { observer } from "mobx-react";

interface LikeThePostProps{
    
    itemId: string;
}

export const ModifyMobxLikes = (itemId: string) => {
    const findPost = userInfo.userFriendsPosts.find((post) => post.itemId === itemId)
    const findMe = findPost?.likes.find((user) => user === userInfo.currentUser.id)

    if(findMe == undefined && findPost != undefined){
        console.log("ei löytyny: ", itemId)  
        return userInfo.newLike(findPost.likes, userInfo.currentUser.id)
    } else if(findPost != undefined) {
        console.log("löytyi: ", itemId)
        return userInfo.remove(findPost.likes, userInfo.currentUser.id)
    }
};

function LikeThePost({itemId}: LikeThePostProps){
    const [like, setLike] = useState(false);

    console.log("Painettu id Likethepost: ", itemId)

    const testSearch = () => {
        console.log("Painettu id testSearch: ", itemId)
        const findPost = userInfo.userFriendsPosts[0].likes.find((userId) => userId === userInfo.currentUser.id)
        //const findMe = findPost?.likes.find((user) => user === userInfo.currentUser.id)
        //console.log("testi: ", findMe)
        if(findPost == undefined){
            //console.log("ei löytyny: ", itemId)
            return(
                <AntDesign name="like2" size={24} color='black' />              
            )
        } else {
            //console.log("löytyi: ", itemId)
            return(
                <AntDesign name="like2" size={24} color='red' />
            )
        }
    };

    const MobxObs = observer(testSearch)

    // const AddLike = () => {
    //     userInfo.newLike(likes, userInfo.currentUser.id)
    // };

    // const RemoveLike = () => {
    //     userInfo.remove(likes, userInfo.currentUser.id)
    // };
    // const IsPostLiked = (): boolean => {
    //     if(likes != undefined){
    //         const findMe = likes.find((user) => user === userInfo.currentUser.id)
    //         if(findMe == undefined){
    //             console.log("ei löytyny: ", findMe)
    //             return false
    //         } else {
    //             console.log("löytyi: ", findMe)
    //             return true
    //         }
    //     } else return false 
    // };

    // const LikedPost = async () => {
    //     const q = query(collection(db, 'posts'), where("itemId", "==", itemId))
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach(async (doc) => {
    //         if(IsPostLiked()){
    //             await updateDoc(doc.ref, {
    //                 likes: arrayRemove(userInfo.currentUser.id)
    //             })
    //         } else {
    //             await updateDoc(doc.ref, {
    //                 likes: arrayUnion(userInfo.currentUser.id)
    //             })
    //         }
            
    //     })
    // };

    return(
        <MobxObs />
    )
};

export default memo(LikeThePost);
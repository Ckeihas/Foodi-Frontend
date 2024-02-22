import React, { useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import userInfo from "../../../mobx/UserInfo";

export default function IsPostLiked(likes: string[]): boolean{
    if(likes != undefined){
        const findMe = likes.find((user) => user === userInfo.currentUser.id)
        if(findMe == undefined){
            console.log("ei löytyny: ", findMe)
            return false
        } else {
            console.log("löytyi: ", findMe)
            return true
        }
    } else return false 
}
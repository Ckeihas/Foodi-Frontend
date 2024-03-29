import axios from "axios";
import { CreateNewAccessToken } from "../components/auth/CheckAccessToken";
import groceries from "../mobx/GroceryListState";
import userInfo from "../mobx/UserInfo";
import { CheckPendingFriendRequests } from "../components/notification/helperFunction/CheckPendingFriendRequests";

export async function GetUserData(){
    await axios.post("http://192.168.1.103:3000/user/profile")
    .then( response => {
        const {username, groceryLists, friendsList, id, userFriendsPosts} = response.data
        console.log("Testi resp: ", username)
        console.log("Lista: ", friendsList)
        console.log("ID: ", id)
        groceries.items = groceryLists
        userInfo.friends = friendsList
        userInfo.userFriendsPosts = userFriendsPosts


        userInfo.addUserData({
            id: id,
            username: username
        })
        
    }).then(() => {
        CheckPendingFriendRequests()
    })
    .catch(err => {
        console.log("Error testi Homescreen: ", err)
    })
};

export const GetCollectionTitles = async () => {
    await axios.post("http://192.168.1.103:3000/user/favorites").then((response) => {
        const getAllCollectionTitles = response.data.favoritePosts.map((item: any) => {
            return {
                title: item.collectionTitle
            }
        })
        userInfo.collectionTitles = getAllCollectionTitles
    })
}
import axios from "axios";
import { CreateNewAccessToken } from "../components/auth/CheckAccessToken";
import groceries from "../mobx/GroceryListState";
import userInfo from "../mobx/UserInfo";

export async function GetUserData(){
    await axios.post("http://192.168.1.103:3000/user/profile")
    .then( response => {
        const {username, groceryLists, id} = response.data
        console.log("Testi resp: ", username)
        console.log("Lista: ", groceryLists)
        console.log("ID: ", id)
        groceries.items = groceryLists
        userInfo.addUserData({
            id: id,
            username: username
        })
        
    }).catch(err => {
        console.log("Error testi Homescreen: ", err)
    })
};
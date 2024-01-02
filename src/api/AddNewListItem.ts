import axios from "axios";
import { CreateNewAccessToken } from "../components/auth/CheckAccessToken";
import groceries from "../mobx/GroceryListState";
import { observer } from "mobx-react";


export async function AddNewListItem(newListName: string, index: number){
    groceries.newItem = newListName
    groceries.itemIndex = index
    groceries.addNewItem()
    // await axios.post("http://192.168.1.103:3000/groceries/new-list", {title: newListName})
    // .then(async resp => {
    //     const {error, message} = resp.data;

    //     if(error){
    //         if(await CreateNewAccessToken()){
    //             await axios.post("http://192.168.1.103:3000/groceries/new-list", {title: newListName})
    //         } else {
    //             console.log("Something went wrong")
    //         }
    //     }
    // })
};
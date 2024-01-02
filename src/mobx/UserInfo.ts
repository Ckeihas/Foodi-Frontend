import { makeAutoObservable, observable } from "mobx";

interface User {
    id: string;
    username: string;
}
class UserInfo{
    currentUser: User = {
        id: "",
        username: ""
    }

    constructor(){   
        makeAutoObservable(this)
    }

    addUserData(user = {id: "", username: ""}) {
        this.currentUser = user
    }
};

const userInfo = new UserInfo();
export default userInfo;
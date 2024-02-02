import { makeAutoObservable, observable } from "mobx";

interface User {
    id: string;
    username: string;
};

interface IFriendRequests {
    id: string;
    username: string;
};

type Ingredients = {
    amount: number,
    id: string,
    name: string,
    unit: string
};

interface Instructions {
    id: string, 
    text: string
  }

interface IUserPosts {
    imageURL: string;
    title: string;
    description: string;
    extendedIngredients: Ingredients[];
    analyzedInstructions: Instructions[];
    id: string;
    username: string
};

const addNewRequest = (requests: IFriendRequests[], newRequest: IFriendRequests) => [
    ...requests,
    newRequest  
];

class UserInfo{
    currentUser: User = {
        id: "",
        username: ""
    };
    friendRequests: IFriendRequests[] = [];
    userFriendsPosts: IUserPosts[] = [];
    newRequest: IFriendRequests = {
        id: "",
        username: ""
    };
    friends: User[] = [];
    

    constructor(){   
        makeAutoObservable(this)
    }

    addUserData(user = {id: "", username: ""}) {
        this.currentUser = user
    }

    addFriendRequest(request: any) {
        this.friendRequests = request
      }
};

const userInfo = new UserInfo();
export default userInfo;
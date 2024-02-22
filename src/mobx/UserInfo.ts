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
    number: number,
    step: string
  }

interface IUserPosts {
    imageURL: string;
    title: string;
    description: string;
    extendedIngredients: Ingredients[];
    analyzedInstructions: Instructions[];
    userId: string;
    itemId: string;
    username: string;
    likes: string[];
};

const addNewRequest = (requests: IFriendRequests[], newRequest: IFriendRequests) => [
    ...requests,
    newRequest  
];

const addNewLike = (likes: string[], newLike: string) => [
    ...likes,
    newLike
];
const removeLike = (likes: string[], removeId: string) => (
   likes.filter((userId) => userId != removeId)
);

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
    };

    addFriendRequest(request: any) {
        this.friendRequests = request
    };

    newLike(likes: string[], newLike: string){
        this.userFriendsPosts[0].likes = addNewLike(likes, newLike)
    };

    remove(likes: string[], removeId: string){
        this.userFriendsPosts[0].likes = removeLike(likes, removeId)
    };
};

const userInfo = new UserInfo();
export default userInfo;
import { makeAutoObservable, observable } from "mobx";

class SavedState {
    isSaved: boolean = false;

    constructor(){   
        makeAutoObservable(this)
    }
};

const savedState = new SavedState();
export default savedState;
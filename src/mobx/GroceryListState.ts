import { makeAutoObservable, observable } from "mobx";

interface GroceryList {
    groceries: string[];
    title: string;
}

const addNewList = (items: GroceryList[], title: string): GroceryList[] => [
    ...items,
    {
        groceries: [],
        title
    }
];

const addNewListItem = (groceries: string[], newItem: string) => [
    ...groceries,
    newItem
]

class Groceries {
    items: GroceryList[] = [];
    newList: string = '';
    newItem: string = '';
    itemIndex: number = 0;

    constructor(){
        makeAutoObservable(this)
    }

    addNewList(){
        this.items = addNewList(this.items, this.newList)
        this.newList = ""
    }

    addNewItem(){
        this.items[this.itemIndex].groceries = addNewListItem(this.items[this.itemIndex].groceries, this.newItem)
    }
};

const groceries = new Groceries();
export default groceries;
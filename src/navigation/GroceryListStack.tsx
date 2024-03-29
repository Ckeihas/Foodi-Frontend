import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import GroceryList from '../components/homeScreen/GroceryList';
import Groceries from '../components/homeScreen/Groceries';


const options: StackNavigationOptions = {
  headerShown: false,
};

export type GroceryStackParams = {
    groceryList: undefined;
    groceries: {
        items: string[],
        index: number,
        title: string
    };
}
const Stack = createStackNavigator<GroceryStackParams>();

export default function GroceryListStack(): JSX.Element{
    return(    
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="groceryList" component={GroceryList}/>
            <Stack.Screen name="groceries" component={Groceries}/>       
        </Stack.Navigator>
    )
};
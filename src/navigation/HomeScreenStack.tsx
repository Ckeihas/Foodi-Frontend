import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabsNavigation';
import { NavigatorScreenParams } from '@react-navigation/native';
import GroceryList from '../components/homeScreen/GroceryList';
import MealPlanner from '../components/homeScreen/MealPlanner';
import Favourites from '../components/homeScreen/Favourites';
import GroceryListStack from './GroceryListStack';

const options: StackNavigationOptions = {
  headerShown: false,
};

interface Ingredients {
    extendedIngredients: any[],
    readyInMinutes: number,
    image: string,
    instructions: any[],
}
export type HomeScreenParams = {
    homeScreen: undefined;
    
    groceryStack: undefined;
    mealPlanner: undefined;
    favourites: undefined;
}
const Stack = createStackNavigator<HomeScreenParams>();

export default function HomeScreenStack(): JSX.Element{
    return(    
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="homeScreen" component={BottomTabNavigation}/>
            <Stack.Screen name="groceryStack" component={GroceryListStack}/>
            <Stack.Screen name="mealPlanner" component={MealPlanner}/>
            <Stack.Screen name="favourites" component={Favourites}/>          
        </Stack.Navigator>
       
    )
};
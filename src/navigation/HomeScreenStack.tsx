import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabsNavigation';
import { NavigatorScreenParams } from '@react-navigation/native';
import GroceryList from '../components/homeScreen/GroceryList';
import MealPlanner from '../components/homeScreen/mealPlanner/MealPlanner';
import Favourites from '../components/homeScreen/favourites/Favourites';
import GroceryListStack from './GroceryListStack';
import Friends from '../components/homeScreen/Friends';
import FriendsStack from './FriendsStack';
import MealPlannerStack from './MealPlannerStack';

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
    friends: undefined;
}
const Stack = createStackNavigator<HomeScreenParams>();

export default function HomeScreenStack(): JSX.Element{
    return(    
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="homeScreen" component={BottomTabNavigation}/>
            <Stack.Screen name="groceryStack" component={GroceryListStack}/>
            <Stack.Screen name="mealPlanner" component={MealPlannerStack}/>
            <Stack.Screen name="favourites" component={Favourites}/> 
            <Stack.Screen name='friends' component={FriendsStack}/>         
        </Stack.Navigator>
       
    )
};
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import UserPostsScreen from '../screens/UserPostsScreen';
import RecipeDetails from '../components/recipeDetails';


const options: StackNavigationOptions = {
    headerShown: false,
};

type Ingredients = {
    amount: number,
    id: string,
    name: string,
    unit: string
};
interface Step {
    number: number;
    step: string;
  }
  
//   interface Instructions {
//     steps: Step[];
//   }
  interface Instructions {
    id: string, 
    text: string
  }

interface PostItem {
    imageURL: string;
    title: string;
    description: string;
    extendedIngredients: Ingredients[];
    analyzedInstructions: Instructions[];
    id: string;
    username: string
}


export type UsersPostsParams = {
    usersPosts: undefined,
    postDetails: PostItem
};

const Stack = createStackNavigator<UsersPostsParams>();

export default function UsersPostsStack(){
    return(
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name='usersPosts' component={UserPostsScreen}/>
            <Stack.Screen name='postDetails' component={RecipeDetails}/>
        </Stack.Navigator>
    )
}
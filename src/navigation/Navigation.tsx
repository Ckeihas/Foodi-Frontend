import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../auth/SignUp';
import CreateUsername from '../screens/CreateUsername';
import HomeScreen from '../screens/HomeScreen';
import Home from '../screens/Home';
import SplashScreen from '../components/SplashScreen';
import RecipeDetails from '../components/recipeDetails';
import PressedIconData from '../components/homeScreen/RecipeCard';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabsNavigation';
import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabParamList } from './BottomTabsNavigation';
import { HomeScreenParams } from './HomeScreenStack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import HomeScreenStack from './HomeScreenStack';
import Login from '../auth/Login';

const options: StackNavigationOptions = {
  headerShown: false,
};

interface Ingredients {
    extendedIngredients: any[],
    readyInMinutes: number,
    image: string,
    instructions: any[],
}
export type RootStackParamList = {
    signup: undefined;
    login: undefined;
    createUsername: {
        userId?: string,
        email?: string,
        password?: string
    };
    home: undefined;
    splash: undefined;
    recipeDetails: Ingredients;
}
const Stack = createStackNavigator<RootStackParamList>();

type testi = CompositeScreenProps<
BottomTabScreenProps<BottomTabParamList, 'home'>,
NativeStackScreenProps<HomeScreenParams>
>;
export default function Navigation(): JSX.Element{
    return(
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="splash" component={SplashScreen}/>
            <Stack.Screen name="signup" component={SignUp}/>
            <Stack.Screen name="login" component={Login}/>
            <Stack.Screen name="createUsername" component={CreateUsername}/>
            <Stack.Screen name="home" component={HomeScreenStack}/>
            {/* <Stack.Screen name="homeScreen" component={HomeScreen}/>
            <Stack.Screen name="recipeDetails" component={RecipeDetails}/> */}
        </Stack.Navigator>
    )
}
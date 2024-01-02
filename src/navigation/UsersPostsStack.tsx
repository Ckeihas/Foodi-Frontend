import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import UserPostsScreen from '../screens/UsersPostsScreen';

const options: StackNavigationOptions = {
    headerShown: false,
};

export type UsersPostsParams = {
    usersPostsScreen: undefined,
    profileScreen: {
        id: string,
        username: string
    }
}

const Stack = createStackNavigator<UsersPostsParams>()

export default function UsersPostsStack(): JSX.Element{
    return(
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name='usersPostsScreen' component={UserPostsScreen}/>
            <Stack.Screen name='profileScreen' component={ProfileScreen}/>
        </Stack.Navigator>
    )
}
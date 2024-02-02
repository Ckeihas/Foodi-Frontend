import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import FindUsersScreen from '../screens/FindUsersScreen';

const options: StackNavigationOptions = {
    headerShown: false,
};

export type UsersPostsParams = {
    findUsersScreen: undefined,
    profileScreen: {
        id: string,
        username: string
    }
}

const Stack = createStackNavigator<UsersPostsParams>()

export default function FindUsersStack(): JSX.Element{
    return(
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name='findUsersScreen' component={FindUsersScreen}/>
            <Stack.Screen name='profileScreen' component={ProfileScreen}/>
        </Stack.Navigator>
    )
}
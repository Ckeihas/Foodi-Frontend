import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import Friends from '../components/homeScreen/Friends';
import FriendRequests from '../components/friends/FriendRequests';


const options: StackNavigationOptions = {
    headerShown: false,
};

interface IRequests {
    id: string,
    username: string
}

export type FriendsParams = {
    friendsFrontPage: undefined,
    requests: {
        requests: IRequests[]
    }
}

const Stack = createStackNavigator<FriendsParams>()

export default function FriendsStack(): JSX.Element{
    return(
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="friendsFrontPage" component={Friends}/>
            <Stack.Screen name="requests" component={FriendRequests}/>       
        </Stack.Navigator>
    )
};
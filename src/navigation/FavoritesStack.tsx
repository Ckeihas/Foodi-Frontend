import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import Favourites from '../components/homeScreen/favourites/Favourites';
import CollectionItems from '../components/homeScreen/favourites/CollectionItems';

const options: StackNavigationOptions = {
    headerShown: false,
};

export type FavoriteParams = {
    favoriteScreen: undefined,
    collectionItems: {
        itemPaths: string[]
    }
}
const Stack = createStackNavigator<FavoriteParams>()

export default function FavoritesStack() {
    return(
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name='favoriteScreen' component={Favourites}/>
            <Stack.Screen name='collectionItems' component={CollectionItems}/>
        </Stack.Navigator>
    )
} 
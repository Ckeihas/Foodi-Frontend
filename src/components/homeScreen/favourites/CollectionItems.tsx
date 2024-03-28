import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FavoriteParams } from "../../../navigation/FavoritesStack";
import axios from "axios";
import { CreateNewAccessToken } from "../../auth/CheckAccessToken";
import RenderPostItem from "./RenderPostItem";

type CollectionProps = NativeStackScreenProps<FavoriteParams, 'collectionItems'>

interface ICollectionPosts {
    post: {};
}
const CollectionItems = ({route}: CollectionProps) => {
    const [collectionPosts, setCollectionPosts] = useState<ICollectionPosts[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<FavoriteParams>>()
    const url = "http://192.168.1.103:3000/user/collection/items"
    const GetItemsFromCollection = async () => {
        if(loading){
            return;
        }
        setLoading(true)
        try {
            const response = await axios.post(url, {items: route.params.itemPaths})
            const { items, error } = response.data
            if(error){
                if(await CreateNewAccessToken()){
                    try {
                        const response = await axios.post(url, {items: route.params.itemPaths})
                        const { items, error } = response.data
                        if(error){
                            setError(true)
                        } else {
                            setCollectionPosts(items)
                        }
                    } catch (error) {
                        console.log("Error fetching collections posts: ", error)
                        setError(true);
                    }
                } else {
                    console.log("Error when creating new access token favorite screen: ", error)
                    setError(true)
                }
            } else {
                setCollectionPosts(items)
            }
            setLoading(false)
        } catch (error) {
            setError(true);
            setLoading(false)
            console.log("error occured: ", error)
        }
    };

    useEffect(() => {
        GetItemsFromCollection();
    }, [])

    return(
        <View style={styles.container}>
            { loading ? <ActivityIndicator /> :
            <>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={30} color="gray" />
            </TouchableOpacity>       
            <FlatList 
            data={collectionPosts}
            renderItem={({item}) => <RenderPostItem item={item}/>}
            />
            </>
        }
        </View>
    )
};

export default CollectionItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
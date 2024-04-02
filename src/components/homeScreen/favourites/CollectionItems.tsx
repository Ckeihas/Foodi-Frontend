import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, SafeAreaView } from "react-native";
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
const { width, height } = Dimensions.get('window');

const CollectionItems = ({route}: CollectionProps) => {
    const [collectionPosts, setCollectionPosts] = useState<ICollectionPosts[]>([]);
    const [lastVisibleItem, setLastVisibleItem] = useState<string>();
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
            const getFirstBatch = route.params.itemPaths.slice(0,15)
            const response = await axios.post(url, {items: getFirstBatch})
            const { items, error } = response.data
            if(error){
                if(await CreateNewAccessToken()){
                    try {
                        const getFirstBatch = route.params.itemPaths.slice(0,15)
                        const response = await axios.post(url, {items: getFirstBatch})
                        const { items, error } = response.data
                        if(error){
                            setError(true)
                        } else {
                            setCollectionPosts(items)       
                            setLastVisibleItem(getFirstBatch[getFirstBatch.length - 1])
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
                const getFirstBatch = route.params.itemPaths.slice(0,15)
                setCollectionPosts(items)
                setLastVisibleItem(getFirstBatch[getFirstBatch.length - 1])
            }
            setLoading(false)
        } catch (error) {
            setError(true);
            setLoading(false)
            console.log("error occured: ", error)
        }
    };

    const PaginateNextPage = async () => {
        try {
            if(lastVisibleItem){
                const findLastItem = route.params.itemPaths.indexOf(lastVisibleItem)
                if(findLastItem !== -1){
                    const nextBatch = route.params.itemPaths.slice(findLastItem + 1);
                    const next15Batch = nextBatch.slice(0, 15)

                    const response = await axios.post(url, {items: next15Batch})
                    const { items, error } = response.data
                    if(error){
                        if(await CreateNewAccessToken()){
                            try {
                                const response = await axios.post(url, {items: next15Batch})
                                const { items, error } = response.data
                                if(error){
                                    setError(true)
                                } else {
                                    setCollectionPosts((existingItems) => {
                                        return [...existingItems, ...items]
                                    })          
                                    setLastVisibleItem(next15Batch[next15Batch.length - 1])
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
                        setCollectionPosts((existingItems) => {
                            return [...existingItems, ...items]
                        })
                        setLastVisibleItem(next15Batch[next15Batch.length - 1])
                    }
                }
            }
            
        } catch (error) {
            setError(true);
            setLoading(false)
            console.log("error occured: ", error)
        }
        console.log("next page")
    };

    useEffect(() => {
        GetItemsFromCollection();
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            { loading ? <ActivityIndicator /> :
            <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
                <Ionicons name="chevron-back-outline" size={30} color="gray" />
            </TouchableOpacity>       
            <FlatList 
            data={collectionPosts}
            renderItem={({item}) => <RenderPostItem item={item}/>}
            contentContainerStyle={styles.flatlistStyles}
            onEndReached={() => PaginateNextPage()}
            onEndReachedThreshold={1}
            />
            </>
        }
        </SafeAreaView>
    )
};

export default CollectionItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        alignSelf: 'flex-start',
        marginTop: 10,
        marginHorizontal: 20
    },
    flatlistStyles: {
        width: width
    }
})
import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeScreenParams } from "../../../navigation/HomeScreenStack";
import RenderCollections from "./RenderCollections";
import axios from "axios";
import userInfo from "../../../mobx/UserInfo";
import { CreateNewAccessToken } from "../../auth/CheckAccessToken";

type HomeScreenProps = NativeStackScreenProps<HomeScreenParams, 'favourites'>

interface IFavoriteCollection {
    collectionTitle: string,
    savedPosts: string[],
    collectionImages: string[],
    collectionId: string
};

const {width, height} = Dimensions.get('window')

export default function Favourites(): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [favoriteCollections, setCollections] = useState<IFavoriteCollection[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenProps>>();

    const firstBatch = "http://192.168.1.103:3000/user/favorites"
    
    const GetFavoritePosts = async () => {
        if(loading){
            return
        }
        setLoading(true)
        try {
            await axios.post(firstBatch).then(async (response) => {
                //console.log("Saatiinko: ", response.data)
                const {error} = response.data
                if(error){
                    if( await CreateNewAccessToken()){
                        try {
                            await axios.post(firstBatch).then((response) => {
                                setCollections(response.data.favoritePosts)
                            })
                        } catch (error) {
                            
                        }
                        
                    }
                } else {
                    setCollections(response.data.favoritePosts)
                }
                
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("Error fetching favourite collections: ", error)
        }
        
    };

    useEffect(() => {
        GetFavoritePosts()
    }, [])


    const Footer = () => {
        return(
            <View style={{marginBottom: 100}}>
                <Text>You reached to bottom</Text>
            </View>
        )
    }
    return(
        <SafeAreaView> 
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>
                <Text>Favorites</Text>
                <TouchableOpacity>
                    <Entypo name="plus" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
            {
                loading ? 
                <ActivityIndicator /> :
                <FlatList 
                data={favoriteCollections}
                keyExtractor={(item) => item.collectionId}
                renderItem={({item}) => <RenderCollections collection={item}/>}
                contentContainerStyle={styles.flatlistStyle}
                numColumns={2}
                ListFooterComponent={() => <Footer />}
                />
            }
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 10
    },
    flatlistStyle: {
        flexGrow: 1,  
    }
})
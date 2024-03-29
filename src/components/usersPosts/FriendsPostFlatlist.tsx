import React, { useCallback, useState, useEffect, useRef } from "react";
import { View, StyleSheet, FlatList, Text, Image, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator, Button } from "react-native";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import SelectCollection from "../bottomSheet/addingFavourite/SelectCollection";



import { observer } from "mobx-react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import RenderPostItem from "./RenderPostItem";
import {BottomSheetModal} from '@gorhom/bottom-sheet';


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
    number: number,
    step: string
  }

interface SavedInfo {
    isSaved: boolean,
    saveDocPath: string,
    docId: string
}

interface PostItem {
    imageURL: string;
    title: string;
    description: string;
    extendedIngredients: Ingredients[];
    analyzedInstructions: Instructions[];
    userId: string;
    itemId: string;
    username: string;
    likes: string[];
    isLiked: boolean;
    savedInfo: SavedInfo;
}
interface IPostInfo {
    docPath: string,
    docId: string,
    imageUrl: string
}
const { width, height } = Dimensions.get('window');


export default function FriendsPostFlatlist(){
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [lastVisible, setLastVisible] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [endReached, setEndReached] = useState(false);
    const [pressedPost, setPressedPost] = useState<IPostInfo>();

    async function saveToSecureStorage(key: string, value: string): Promise<void> {
        await SecureStore.setItemAsync(key, value);
    };

    const firstBatch = "http://192.168.1.103:3000/user/posts"
    const nextPage = "http://192.168.1.103:3000/user/posts/next-page";

    const GetPaginatedPosts = async (url: string) => {
        //console.log("Before loading check")
        if(loading){
            return;
        }
        if(endReached){
            return;
        }
        console.log("Get posts")
        setLoading(true)
        let refreshToken = await SecureStore.getItemAsync("RefreshToken");
        await axios.post(url, {data: lastVisible}).then(async (response: any) => {
            const {error, message,  userFriendsPosts, lastVisibleItem, endReached } = response.data
            
            if(error){
                await axios.post("http://192.168.1.103:3000/new/new-access", {refreshToken: refreshToken})
                .then((resp) => {
                    const {error, accessToken, message} = resp.data;

                    console.log("Success: ", accessToken, message)
                    const newAccessToken = "AccessToken";
                    saveToSecureStorage(newAccessToken, accessToken)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                }).then(async () => {
                    console.log('then')
                    await axios.post(url, {data: lastVisible}).then(async response => {
                        const {error, userFriendsPosts, lastVisibleItem, endReached } = response.data
                        if(endReached){
                            console.log('End Reached')
                            setEndReached(true)
                        } else {               
                            setPosts((existingPosts) => {
                                return [...existingPosts, ...userFriendsPosts]
                            });
                            setLastVisible(lastVisibleItem)
                        };
                        
                    })
                })
            } else {
                if(endReached){
                    console.log('End reached')  
                    setEndReached(true)      
                } else {
                    console.log("setted")
                    setPosts((existingPosts) => {
                        return [...existingPosts, ...userFriendsPosts]
                    });
                    setLastVisible(lastVisibleItem);
                };
                
            }   
        })
        .then(() => {
            setLoading(false)
        })
        .catch((error: any) => {
            console.log("Error: ", error)
        })
        
    };

    useEffect(() => {
        console.log("use effect")
        GetPaginatedPosts(firstBatch)
    }, []);


    const ListFooter = () => {
        return(
            <View>
                {
                    loading ? <ActivityIndicator /> :
                    posts.length == 0 ?
                    <View style={styles.noPostsYetCont}>
                        <Text style={styles.noPostsYetText}>No posts yet. Add Friends to see their posts!</Text>
                    </View> :
                    endReached ?
                    <View style={{alignItems: 'center'}}>
                        <AntDesign name="checkcircleo" size={30} color="green" />
                        <Text style={styles.listFooterTextStyle}>You have seen all posts</Text>
                    </View> :
                    <View></View>
                }
                
            </View>
        )
    }
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const openBottomSheet = () => bottomSheetRef.current?.present();
    const closeBottomSheet = () =>  bottomSheetRef.current?.close();

    const ToggleBottomSheet = ({postInfo}: {postInfo: IPostInfo}) => {
        setPressedPost(postInfo)
        openBottomSheet();
    };

    return(
        <SafeAreaView style={styles.container}>
            <FlatList 
            data={posts}
            keyExtractor={(item) => item.itemId}
            renderItem={({item, index}) => <RenderPostItem item={item} index={index} ToggleBottomSheet={ToggleBottomSheet}/>}
            contentContainerStyle={styles.flatlistStyle}
            onEndReached={() => GetPaginatedPosts(nextPage)}
            onEndReachedThreshold={2}
            ListFooterComponent={() => <ListFooter />}
            />
            <SelectCollection ref={bottomSheetRef} closeBottomSheet={closeBottomSheet} title="" postInfo={pressedPost}/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    postCardCont: {
        flexDirection: 'column',
        marginBottom: 60
    },
    postContents: {
        alignItems: 'center',
        width: width,
        marginVertical: 10
    },
    postImg: {
        width: width / 1.2,
        height: 320,
        borderRadius: 20,
    },
    postOwnerCont: {
        width: width / 1.2,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    postOwnerImg: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    flatlistStyle: {
        alignItems: 'center'
    },
    usernameTimeCont: {
        marginLeft: 10
    },
    username: {
        fontWeight: 'bold',
        fontSize: 14
    },
    time: {
        color: 'darkgray',
        
    },
    descriptionCont: {
        width: width / 1.2,
        marginVertical: 16
    },
    descriptionText: {
        color: '#6A6A6A',
        fontWeight: '500'
    },
    postStatsCont: {
        flexDirection: 'row',
        width: width / 1.2,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    likeAndSaveCont: {
        flexDirection: 'row',
    },
    saveIcon: {
        left: 40,
        position: 'absolute'
    },
    likesCont: {
        alignItems: 'center'
    },
    likeHeader: {
        color: 'gray',
        fontSize: 12,
        fontWeight: '600'
    },
    likes: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    listFooterTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 60,
        marginTop: 20
    },
    noPostsYetCont: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50%',
        padding: 100
    },
    noPostsYetText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 30
    }
})
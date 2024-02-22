import React, { useCallback, useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, Image, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator, Button } from "react-native";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UsersPostsParams } from "../../navigation/UserPostsStack";
import userInfo from "../../mobx/UserInfo";
import IsPostLiked from "../bottomSheet/addNewPostHelpers/IsPostLiked";
import LikeThePost from "../bottomSheet/addNewPostHelpers/LikeThePost";
import { ModifyMobxLikes } from "../bottomSheet/addNewPostHelpers/LikeThePost";
import { observer } from "mobx-react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';


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
}

const { width, height } = Dimensions.get('window');

interface LikeThePostProps {
    itemId: string
}
export default function FriendsPostFlatlist(){
    const [pressed, setPressed] = useState(false);
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [lastVisible, setLastVisible] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [endReached, setEndReached] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<UsersPostsParams>>();

    // const Test = ({itemId, index}: {itemId: string, index: number}) => {
    //     console.log(index)
    //     console.log("RETURN LIKE: ", itemId)
    //     const findMe = userInfo.userFriendsPosts[index].likes.find((userId) => userId === userInfo.currentUser.id);
    //     const findPost = userInfo.userFriendsPosts[index].likes
    //     //const findMe = findPost?.likes.find((userId) => userId === userInfo.currentUser.id)
    //     console.log("Find post: ", findPost)
    //         if(findMe == undefined && findPost){
    //             console.log("ei löytyny: ", itemId)
    //             userInfo.newLike(findPost, userInfo.currentUser.id)
    //             return false
    //         } else if(findPost) {
    //             console.log("löytyi: ", itemId)
    //             userInfo.remove(findPost, userInfo.currentUser.id)
    //             return true
    //         }
    // };

    // const ReturnLike = ({itemId, index}: {itemId: string, index: number}) => {
    //     console.log(index)
    //     console.log("RETURN LIKE: ", itemId)
    //     const findPost = userInfo.userFriendsPosts[index].likes.find((userId) => userId === userInfo.currentUser.id);
    //     //const findMe = findPost?.likes.find((userId) => userId === userInfo.currentUser.id)
    //     //console.log("Find post: ", findPost)
    //         if(findPost == undefined){
    //             //console.log("ei löytyny: ", itemId)
    //             return(
    //                 <AntDesign name="like2" size={24} color='black' />              
    //             )
    //         } else {
    //             //console.log("löytyi: ", itemId)
    //             return(
    //                 <AntDesign name="like2" size={24} color='red' />
    //             )
    //         }
    // };
    // const Observ = observer(ReturnLike);
    async function saveToSecureStorage(key: string, value: string): Promise<void> {
        await SecureStore.setItemAsync(key, value);
    };

  
    const firstBatch = "http://192.168.1.103:3000/user/posts"
    const nextPage = "http://192.168.1.103:3000/user/posts/next-page";

    const GetPaginatedPosts = async (url: string) => {
        console.log("Before loading check")
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
            setLoading(false)
        }).catch((error: any) => {
            console.log("Error: ", error)
        })
    };

    useEffect(() => {
        console.log("use effect")
        GetPaginatedPosts(firstBatch)
    }, []);

    const renderFlatListItem = ({item, index}: {item: PostItem, index: number}) => {
        return(
            <View style={styles.postCardCont}>
                <View style={styles.postContents}>
                    <View style={styles.postOwnerCont}>
                        <Image source={require('../../../assets/profile1.jpg')} style={styles.postOwnerImg}/>
                        <View style={styles.usernameTimeCont}>
                            <Text style={styles.username}>{item.username}</Text>
                            <Text style={styles.time}>4h ago</Text>
                        </View>
                    </View>
                    <View style={styles.descriptionCont}>
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    </View>
                    <Image source={{uri: item.imageURL}} style={styles.postImg}/>
                    <View style={styles.postStatsCont}>
                        <View style={styles.likeAndSaveCont}>
                            <TouchableOpacity>
                                <AntDesign name="like2" size={24} color="black" />
                            </TouchableOpacity>
                            
                            <Ionicons name="download-outline" size={24} color="black" style={styles.saveIcon}/>
                        </View>
                        <View style={styles.likesCont}>
                            <Text style={styles.likeHeader}>Likes</Text>
                            <Text style={styles.likes}>345</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('postDetails', {
                            extendedIngredients: item.extendedIngredients,
                            analyzedInstructions: item.analyzedInstructions,
                            imageURL: item.imageURL,
                            description: item.description,
                            title: item.title,
                            userId: item.userId,
                            username: item.username
                        })}>
                            <Feather name="book-open" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>             
            </View>
        )
    }

    const ListFooter = () => {
        return(
            <View>
                {
                    loading && <ActivityIndicator />
                }
                {
                    endReached &&
                    <View style={{alignItems: 'center'}}>
                        <AntDesign name="checkcircleo" size={30} color="green" />
                        <Text style={styles.listFooterTextStyle}>You have seen all posts</Text>
                    </View>
                }
            </View>
        )
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <FlatList 
            data={posts}
            keyExtractor={(item) => item.itemId}
            renderItem={({item, index}) => renderFlatListItem({item, index})}
            contentContainerStyle={styles.flatlistStyle}
            onEndReached={() => GetPaginatedPosts(nextPage)}
            ListFooterComponent={() => <ListFooter />}
            />
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
    }
})
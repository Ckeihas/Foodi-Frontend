import React, { memo, useRef, useState } from "react";
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UsersPostsParams } from "../../navigation/UserPostsStack";
import axios from "axios";
import { CreateNewAccessToken } from "../auth/CheckAccessToken";
import BottomSheet from "@gorhom/bottom-sheet";
import userInfo from "../../mobx/UserInfo";
import { observer } from "mobx-react";

type Ingredients = {
    amount: number,
    id: string,
    name: string,
    unit: string
};

interface Instructions {
    id: string,
    number: number,
    step: string
};

interface SavedInfo {
    isSaved: boolean,
    saveDocPath: string,
    docId: string
};

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

interface IBottomSheetFunc {
    toggleBottomSheet: () => void | undefined;
}

const { width, height } = Dimensions.get('window');

const RenderPostItem = ({item, index, ToggleBottomSheet}: {item: PostItem, index: number, ToggleBottomSheet: any}) => {
    const [like, setLike] = useState(item.isLiked);
    const [save, setSave] = useState(item.savedInfo.isSaved)
    const [showBottomSheet, setShowBottomSheet] = useState(false)

    const navigation = useNavigation<NativeStackNavigationProp<UsersPostsParams>>();
    const collectionTitle = "breakfast";

    const HandleLike = (itemId: string) => {
        
        setLike(() => !like)
        axios.post("http://192.168.1.103:3000/user/posts/like", {itemId}).then(async (response: any) => {
            const {error, message} = response.data;
            if(error){
                if(await CreateNewAccessToken()){
                    axios.post("http://192.168.1.103:3000/user/posts/like", {itemId})
                }
                else {
                    console.log("Something went wrong")
                }
            }
        })
        console.log("Add: ", itemId)
    };
    
    const RemoveLike = (itemId: string) => {
        setLike(() => !like)
        axios.post("http://192.168.1.103:3000/user/posts/like/remove", {itemId}).then(async (response: any) => {
            const {error, message} = response.data;
            if(error){
                if(await CreateNewAccessToken()){
                    axios.post("http://192.168.1.103:3000/user/posts/like/remove", {itemId})
                }
                else {
                    console.log("Something went wrong")
                }
            }
        })
        console.log("Remove: ", itemId)
    };

    const AddFavourite = async (docPath: string, docId: string, collectionTitle: string) => {
       setSave(() => !save)
       const data = {
        docPath: docPath,
        docId: docId,
        collectionTitle: collectionTitle
        }   
       await axios.post("http://192.168.1.103:3000/user/posts/add/favourite", {data: data}).then(async (response: any) => {
        const {error, message} = response.data;
        if(error){
            if(await CreateNewAccessToken()){
                await axios.post("http://192.168.1.103:3000/user/posts/add/favourite", {data: data})
            }
            else {
                console.log("Something went wrong")
            }
        }
    })
    };
    
    const RemoveFavourite = async (docPath: string, docId: string) => {
        const data = {
            docPath: docPath,
            docId: docId,
        }
        setSave(() => !save)

        await axios.post("http://192.168.1.103:3000/user/posts/remove/favourite", {data: data}).then(async (response: any) => {
            const {error, message} = response.data;
            if(error){
                if(await CreateNewAccessToken()){
                   await axios.post("http://192.168.1.103:3000/user/posts/remove/favourite", {data: data})
                }
                else {
                    console.log("Something went wrong")
                }
            }
        })
    }
    
    const bottomSheetRef = useRef<BottomSheet>(null);
    const openBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);
    const closeBottomSheet = () =>  bottomSheetRef.current?.close();

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
                        <TouchableOpacity onPress={() => {like ? RemoveLike(item.itemId) : HandleLike(item.itemId)}}>
                            <AntDesign name="like2" size={24} color={like ? 'red' : 'black'}/>
                        </TouchableOpacity>
                        {/* {save ? RemoveFavourite(item.savedInfo.saveDocPath, item.savedInfo.docId) : AddFavourite(item.savedInfo.saveDocPath, item.savedInfo.docId, collectionTitle)} */}
                        <TouchableOpacity onPress={() => {
                            if (save) {
                                RemoveFavourite(item.savedInfo.saveDocPath, item.savedInfo.docId);
                            } else {
                                ToggleBottomSheet({
                                    postInfo: {
                                        imageUrl: item.imageURL,
                                        docPath: item.savedInfo.saveDocPath, 
                                        docId: item.savedInfo.docId
                                    }
                                });
                                AddFavourite(item.savedInfo.saveDocPath, item.savedInfo.docId, '');
                            }
                        }}
                        >
                            <Ionicons name="download-outline" size={24} color={save ? '#E5DB00' : 'black'} style={styles.saveIcon}/>
                        </TouchableOpacity>                
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
};

export default memo(RenderPostItem, (prevProps, nextProps) => {
    return prevProps.item.itemId === nextProps.item.itemId
},);

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
})
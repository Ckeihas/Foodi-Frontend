import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image  } from "react-native";
import { Modal } from "../components/PopupModal";
import { theme } from "../theme/theme";
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytesResumable, uploadString, getDownloadURL } from "firebase/storage";
import {addDoc, collection, onSnapshot} from "firebase/firestore"
import { storage } from "../firebase/config";
import { db } from "../firebase/config";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import userInfo from "../mobx/UserInfo";
import { AddNewPostBottomSheet } from "../components/bottomSheet/AddNewPostBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import FriendsPostFlatlist from "../components/usersPosts/FriendsPostFlatlist";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

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

interface IUserPosts {
    imageURL: string;
    title: string;
    description: string;
    extendedIngredients: Ingredients[];
    analyzedInstructions: Instructions[];
    userId: string;
    itemId: string;
    username: string;
    likes: string[];
};

export default function UserPostsScreen(){

    const [posts, setPosts] = useState<IUserPosts[]>([]);
    const [lastVisible, setLastVisible] = useState();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const openBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);
    const closeBottomSheet = () => bottomSheetRef.current?.close();

    return(
        <View style={styles.container}>
            <FriendsPostFlatlist />
            <Button title="Press" onPress={() => openBottomSheet()}/>
            <AddNewPostBottomSheet ref={bottomSheetRef} title="testi" closeBottomSheet={closeBottomSheet}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    inputField: {
        paddingBottom: 10,
        marginLeft: 20,
        marginRight: 20
    },
    selectionCont: {
        marginTop: 30,
        flexDirection: 'row',
        marginBottom: 26,
    },
    icon: {
        marginBottom: 10
    },
    modalButtonsCont: {
        
    },
    addBtn: {
        backgroundColor: theme.mainColor,
        padding: 10,
        borderRadius: 10,
        width: 80,
        alignItems: 'center',
        marginLeft: 30
    },
    addText: {
        color: 'white',
        fontWeight: 'bold'
    },
    cancelBtn: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
        width: 80,
        alignItems: 'center',
    },
    cancelText: {
        color: 'white',
        fontWeight: 'bold'
    },
    camera: {
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        width: 80
    },
    gallery: {
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        width: 80
    },
    delete: {
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        width: 80
    },
    selectionTitles: {
        color: '#7A7A7A',
        marginTop: 5
    }
});
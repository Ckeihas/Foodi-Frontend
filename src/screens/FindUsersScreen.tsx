import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, ActivityIndicator, FlatList, Image, Dimensions, Pressable, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import { theme } from "../theme/theme";
import { debounce } from "lodash"
import { db } from "../firebase/config";
import { collection, query, where, getDocs, doc, orderBy, serverTimestamp } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UsersPostsParams } from "../navigation/FindUsersStack";

type SearchedUser = {
    id: string,
    username: string
}

const { width, height } = Dimensions.get('window')
export default function FindUsersScreen(){
    const [loading, setLoading] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<SearchedUser[]>([]);

    const navigation = useNavigation<NativeStackNavigationProp<UsersPostsParams>>();

    const userSearch = async (value: string) => {
        console.log("testi")
        setLoading(true);
        if(value && value.length >= 1){
            const usersCollection = collection(db, 'users');

            const q = query(
                collection(db, 'users'),
                where('username', '>=', value),
                where('username', '<=', value + '\uf8ff'),
                orderBy('username')
              );

            const querySnapshot = await getDocs(q);

            const users: SearchedUser[] = [];
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, username: doc.data().username });
                //console.log("Haettu data: ", doc.data())
            });

            setSearchResult(users);
            setLoading(false)
        } else{
            setSearchResult([])
            setLoading(false)
        }
    };

    const renderFlatList = ({item}: {item: SearchedUser}) => {
        return(
            <TouchableOpacity style={styles.foundUsersCont} onPress={() => navigation.navigate("profileScreen", {
                id: item.id,
                username: item.username
            })}>
                <Image source={require("../../assets/food5.jpg")} style={styles.searchedUserImg}/>
                <Text style={styles.usernameStyle}>{item.username}</Text>
            </TouchableOpacity>
        )
    }

    const showSearchResult = useCallback(() => {
        return(
            <FlatList 
            data={searchResult}
            renderItem={renderFlatList}
            contentContainerStyle={styles.flatListStyle}
            />
        )
    }, [searchResult])


    const handleTextDebounce = useCallback(debounce(userSearch, 600), [])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.inputCont}>
                        <FontAwesome 
                        name="search" 
                        size={20} 
                        color={theme.mainColor}
                        style={styles.icon}
                        />
                        <TextInput 
                        placeholder="Username" 
                        style={styles.inputField}
                        onChangeText={handleTextDebounce}
                        />
                </View>
            </View>
            {
                loading ? (
                <ActivityIndicator size={"large"}/>
                ) : 
                (
                    showSearchResult()   
                )
                
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginTop: 100
    },
    headerTextCont: {
        marginHorizontal: 30,
        marginVertical: 30
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 26
    },
    inputField: {
        paddingBottom: 10,
        marginLeft: 15
    },
    inputCont: {
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 26,
        width: 300,
    },
    icon: {
        marginBottom: 6
    },
    foundUsersCont: {   
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,  
        marginHorizontal: 40
    },
    searchedUserImg: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    flatListStyle: {
        width: width
    },
    usernameStyle: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 20
    }
});
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList, TouchableWithoutFeedback, Button } from "react-native";
import { RootStackParamList } from "../../navigation/Navigation";
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; 
import { HomeScreenParams } from "../../navigation/HomeScreenStack";
import { GroceryStackParams } from "../../navigation/GroceryListStack";
import { theme } from "../../theme/theme";
import groceries from "../../mobx/GroceryListState";
import { Modal } from "../PopupModal";
import { AddNewList } from "../../api/AddNewList";
import { observer } from "mobx-react";
//import { renderGroceryListItem } from "./testi";
import GroceryListFlatList from "../groceryScreens/GroceryListFaltList";
import GroceryListModal from "../groceryScreens/GroceryListModal";

 function GroceryList(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenParams>>();
    
    console.log("testi")
    return(
        <SafeAreaView style={styles.container}>   
            <View style={styles.headerCont}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Grocery Lists</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="file-document-edit-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <GroceryListFlatList />
            <GroceryListModal AddNewFunction={AddNewList}/>
        </SafeAreaView>
    )
};

export default React.memo(GroceryList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    headerCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        marginHorizontal: 30,
    },
    listTitleIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 270,
        marginHorizontal: 20
    },
    listItemContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        marginBottom: 20,
        height: 50,
        width: 300,
        borderRadius: 10,
    },
    flatListStyles: {
        alignItems: 'center',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    newListBtnContainer: {
        backgroundColor: theme.mainColor,
        marginHorizontal: 80,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#171717',
        shadowOffset: {width: 1, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    newListBtn: {
        alignItems: 'center',
        height: 60,
        justifyContent: 'center'
    },
    newListText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    inputField: {
        paddingBottom: 10,
        marginLeft: 20,
        marginRight: 20
    },
    inputCont: {
        marginTop: 30,
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 26,
        width: 250,
    },
    icon: {
        marginBottom: 10
    },
    modalButtonsCont: {
        flexDirection: 'row',
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
        marginRight: 30
    },
    cancelText: {
        color: 'white',
        fontWeight: 'bold'
    }
})
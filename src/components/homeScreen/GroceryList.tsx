import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, TouchableWithoutFeedback } from "react-native";
import { RootStackParamList } from "../../navigation/Navigation";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { HomeScreenParams } from "../../navigation/HomeScreenStack";
import { GroceryStackParams } from "../../navigation/GroceryListStack";
import { theme } from "../../theme/theme";

interface IgroceryList {
    id: number,
    title: string
}
const data: IgroceryList[] = [
    {
        id: 1,
        title: "Maanantain ostolista"
    },
    {
        id: 2,
        title: "Pasta bolognese"
    },
    {
        id: 3,
        title: "Kauppalista"
    },
    {
        id: 4,
        title: "Kauppalista kaverille"
    },
];

type GroceryListType = {
    item: IgroceryList;
}
export default function GroceryList(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenParams>>();
    const groceryNav = useNavigation<NativeStackNavigationProp<GroceryStackParams>>();

    const renderGroceryListItem = ({item}: GroceryListType) => {
        return(
            <TouchableOpacity 
            style={styles.listItemContainer}
            onPress={() => groceryNav.navigate("groceries")}
            >
                <View style={styles.listTitleIconContainer}>
                    <Text>{item.title}</Text>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                </View>
            </TouchableOpacity>
        )
    }
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
            <FlatList 
            data={data}
            renderItem={renderGroceryListItem}
            contentContainerStyle={styles.flatListStyles}
            />
            <TouchableOpacity style={styles.newListBtnContainer}>
                <View style={styles.newListBtn}>
                    <Text style={styles.newListText}>Add New List +</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

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
    }
})
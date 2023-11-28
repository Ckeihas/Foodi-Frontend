import React from "react";
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GroceryStackParams } from "../../navigation/GroceryListStack";

interface IGroceryItems {
    title: string
}
const data: IGroceryItems[] = [
    {
        title: "Actimel"
    },
    {
        title: "Kananmuna"
    },
    {
        title: "Murot"
    },
    {
        title: "Maito"
    },
    {
        title: "Jauheliha"
    },
    {
        title: "Kerma"
    },
    {
        title: "Jäätelö"
    },
];

type GroceryItemType = {
    item: IGroceryItems
}
export default function Groceries(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<GroceryStackParams>>();

    const renderGroceryItem = ({item}: GroceryItemType) => {
        return(
            <TouchableOpacity style={styles.listItemContainer}>
                <View style={styles.checkCont}></View>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        )
    }
    return(
        <SafeAreaView>
            <View style={styles.headerCont}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Groceries</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="file-document-edit-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <FlatList
            data={data}
            renderItem={renderGroceryItem}
            contentContainerStyle={styles.flatListStyles}
            />
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
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 20,
        height: 50,
        width: 300,
        borderRadius: 10,
        paddingLeft: 20,
    },
    checkCont: {
        padding: 10,
        marginRight: 10,
        width: 30,
        height: 30,
        borderRadius: 100,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'lightgray'
    },
    flatListStyles: {
        alignItems: 'center',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
})
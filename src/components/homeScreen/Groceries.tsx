import React, { useCallback, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { GroceryStackParams } from "../../navigation/GroceryListStack";
import GroceryListModal from "../groceryScreens/GroceryListModal";
import { AddNewListItem } from "../../api/AddNewListItem";
import { observer } from "mobx-react";
import groceries from "../../mobx/GroceryListState";
import { Entypo } from "@expo/vector-icons"


type GroceriesProps = NativeStackScreenProps<GroceryStackParams, 'groceries'>
export default function Groceries({route}: GroceriesProps): JSX.Element {
    const [isDone, setIsDone] = useState<{ [key: string]: boolean }>({});
    const navigation = useNavigation<NativeStackNavigationProp<GroceryStackParams>>();
    const { items, index } = route.params;
    console.log(index)

    const handleIsDone = (index: number) => {
        console.log(index)
        const key = `${index}`;
        setIsDone({ ...isDone, [key]: !isDone[key] });
    };

    const renderGroceryItem = ({item, index}: {item: string, index: number}) => {
        console.log("Render Grocery Item Func", index)
        const key = `${index}`;
        const taskDone = isDone[key] || false;
        return(
            <TouchableOpacity style={styles.listItemContainer} onPress={() => handleIsDone(index)}>
                <View style={[styles.checkCont, { backgroundColor: taskDone ? "#6AF000" : 'white' }]}>
                {
                    taskDone ?
                    <Entypo name="check" size={20} color='white'/>
                     :       
                    <View></View>
                    
                    
                }
               </View> 
               <Text>{item}</Text> 
            </TouchableOpacity>
        )
    };

    const ShowFlatList = observer(() => {
        console.log("Show flatlist func")
        return(
            <FlatList
            data={groceries.items[index].groceries}
            renderItem={({item, index}) => renderGroceryItem({item, index})}
            contentContainerStyle={styles.flatListStyles}
            />
        )
    });
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerCont}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Groceries</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="file-document-edit-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <ShowFlatList />
            <GroceryListModal AddNewFunction={AddNewListItem} index={index}/>
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
        marginRight: 10,
        width: 30,
        height: 30,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: 'lightgray',
    },
    flatListStyles: {
        alignItems: 'center',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
})
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { GroceryStackParams } from "../../navigation/GroceryListStack";
import { theme } from "../../theme/theme";
import groceries from "../../mobx/GroceryListState";
import { observer } from "mobx-react";


interface IgroceryList {
    groceries: string[],
    title: string
};

type GroceryListType = {
    groceries: string[];
    title: string;
};
    //groceries.newList = newlistName
    
function GroceryListFlatList(){
    const groceryNav = useNavigation<NativeStackNavigationProp<GroceryStackParams>>();
    const renderGroceryListItem = ({item, index}: {item: GroceryListType, index: number}) => {  
        
        console.log(index)
        return(
            <TouchableOpacity 
            style={styles.listItemContainer}
            onPress={() => groceryNav.navigate("groceries", {
                items: item.groceries,
                index: index,
                title: item.title
            })}
            >
                <View style={styles.listTitleIconContainer}>
                    <View>
                        <Text style={styles.listTitle}>{item.title}</Text>
                        <Text style={styles.productAmount}>{item.groceries.length} products</Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="gray" />
                </View>
            </TouchableOpacity>
        )
    };
    const ShowFlatList = observer(() => {
        console.log("Testi")
        return(
            <FlatList 
            data={groceries.items}
            renderItem={({item, index}) => renderGroceryListItem({item, index})}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListStyles}
            />
        )
    });
   
    return(
        <View style={{flex: 1}}>
            <ShowFlatList />
        </View>
    )
};

export default React.memo(GroceryListFlatList)

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
        marginHorizontal: 20,
        alignItems: 'center'
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
    },
    listTitle: {
        fontWeight: '600',
        fontSize: 15
    },
    productAmount: {
        marginTop: 5,
        color: 'darkgray',
        fontWeight: '500'
    }
})
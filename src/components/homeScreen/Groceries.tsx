import React, { useCallback, useState, useMemo, useRef } from "react";
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList, Image, Dimensions } from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { GroceryStackParams } from "../../navigation/GroceryListStack";
import GroceryListModal from "../groceryScreens/GroceryListModal";
import { AddNewListItem } from "../../api/AddNewListItem";
import { observer } from "mobx-react";
import groceries from "../../mobx/GroceryListState";
import { Entypo } from "@expo/vector-icons"
import { theme } from "../../theme/theme";
import {CustomBottomSheet} from "../bottomSheet/CustomBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";


const {width, height} = Dimensions.get('window')
type GroceriesProps = NativeStackScreenProps<GroceryStackParams, 'groceries'>
export default function Groceries({route}: GroceriesProps): JSX.Element {
    const [isDone, setIsDone] = useState<{ [key: string]: boolean }>({});
    const navigation = useNavigation<NativeStackNavigationProp<GroceryStackParams>>();
    const { items, index, title } = route.params;

    const bottomSheetRef = useRef<BottomSheet>(null);
    const openBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);

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
            <View style={{flexDirection: 'column'}}>
            <TouchableOpacity style={styles.listItemContainer} onPress={() => handleIsDone(index)}>
                <View style={[styles.checkCont, { backgroundColor: taskDone ? "#6AF000" : 'white' }]}>
                {
                    taskDone ?
                    <Entypo name="check" size={20} color='white'/>
                     :       
                    <View></View>
                    
                    
                }
               </View> 
               <Text style={styles.itemTitle}>{item}</Text>
               
            </TouchableOpacity>
            <View style={styles.seperatorLine}></View>
            </View>
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
                    <Ionicons name="chevron-back-outline" size={30} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addBackground} onPress={() => openBottomSheet()}>
                    <View style={styles.invitedPeopleCont}>
                        <View style={styles.invitedAmountCont}>
                            <Text style={styles.invitedAmountText}>+2</Text>
                        </View>
                        <Image source={require("../../../assets/profile1.jpg")} style={styles.invitedImg1}/>
                        <Image source={require("../../../assets/profile2.jpg")} style={styles.invitedImg2}/>
                    </View>
                    <Entypo name="plus" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.headerText}>{title}</Text>
            <ShowFlatList />
            <GroceryListModal AddNewFunction={AddNewListItem} index={index}/>
            <CustomBottomSheet ref={bottomSheetRef} title="testi"/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 26,
        fontWeight: '500',
        marginLeft: 60,
        marginBottom: 30
    },
    headerCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 30,
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 50,
        width: 300,
        borderRadius: 10,
        
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
    seperatorLine: {
        width: 300,
        borderWidth: 0.5,
        borderColor: 'lightgray',
        marginTop: 10,
        marginBottom: 10
    },
    itemTitle: {
        fontWeight: '500'
    },
    addBackground: {
        backgroundColor: theme.mainColor,
        borderRadius: 100,
        padding: 4
    },
    invitedPeopleCont: {
        position: 'absolute',
        flexDirection: 'row',
        right: 25
    },
    invitedImg1: {
        width: 30,
        height: 30,
        borderRadius: 100,
        left: 10
    },
    invitedImg2: {
        width: 30,
        height: 30,
        borderRadius: 100,
        
    },
    invitedAmountCont: {
        position: 'absolute',
        backgroundColor: theme.mainColor,
        borderRadius: 100,
        padding: 3,
        bottom: 20,
        zIndex: 2
    },
    invitedAmountText: {
        fontSize: 10,
        color: 'white'
    },
    sendBtn: {
        position: 'absolute',
        bottom: 60,
        left: 165
    }
})
import React from "react";
import { View, StyleSheet, FlatList, Image, ImageSourcePropType, Text, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';



const testii= [
    {
        id: 0,
        title: "Breakfast",
        image: require("../../../../assets/food3.jpg")
    },
    {
        id: 1,
        title: "Lunch",
        image: require("../../../../assets/food4.jpg")
    },
    {
        id: 2,
        title: "Lunch nmr 2",
        image: require("../../../../assets/food1.jpg")
    },
    {
        id: 3,
        title: "Snack",
        image: require("../../../../assets/food2.jpg")
    },
    {
        id: 4,
        title: "Dinner",
        image: require("../../../../assets/food5.jpg")
    },
    {
        id: 5,
        title: "Dessert",
        image: require("../../../../assets/food2.jpg")
    },
];

type MealDataType = {
    id: number,
    title: string,
    image: ImageSourcePropType
}

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const { width, height } = Dimensions.get('window')
export default function CalendarFlatList(): JSX.Element{


    const renderFlatListItem = ({item}: {item: MealDataType}) => {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.checkCont}>
                    <View></View>
                </TouchableOpacity>
                <View style={styles.cardCont}>
                    <Image source={item.image} style={styles.cardImg}/>

                    <View style={styles.infoCont}>
                        <Text style={styles.mealTitle}>{item.title}</Text>
                        <Text style={styles.mealDescription}>
                            {
                                description.length > 100 ? description.slice(0,100) + "..." : description
                            }
                        </Text>
                        <View style={styles.macrosCont}>
                            <View style={styles.timeCont}>
                                <AntDesign name="clockcircleo" size={10} color="#40D94E" />
                                <Text style={styles.cardText}>20m</Text>
                            </View>
                            <View style={styles.calorCont}>
                                <FontAwesome5 name="fire" size={10} color="#40D94E" />
                                <Text style={styles.cardText}>550kcla</Text>
                            </View>
                            <View style={styles.calorCont}>
                                <MaterialCommunityIcons name="arm-flex-outline" size={10} color="#40D94E" />
                                <Text style={styles.cardText}>16g</Text>
                            </View>
                            <View style={styles.calorCont}>
                                <FontAwesome5 name="weight" size={10} color="#40D94E" />
                                <Text style={styles.cardText}>10g</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    const ShowFlatList = () => {
        return(
            <FlatList 
            data={testii}
            renderItem={renderFlatListItem}
            contentContainerStyle={styles.flatlistStyles}
            />
        )
    }
    return(  
        <ShowFlatList />  
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: width - 30,
        marginTop: 25,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderRadius: 15,
    },
    cardCont: {
        flexDirection: 'row',
        height: 150,
        alignItems: 'center',
    },
    cardImg: {
        width: 100,
        height: 134,
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 15
    },
    cardText: {
        color: 'black',
        fontSize: 12
    },
    timeCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5
    },
    calorCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    flatlistStyles: {
        alignItems: 'center',
        paddingBottom: 500
    },
    mealTitle: {
        fontWeight: '600',
        fontSize: 16,
        marginTop: 20
    },
    infoCont: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 150,
    },
    macrosCont: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    mealDescription: {
        width: 200,
    },
    checkCont: {
        width: 30,
        height: 30,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: "#40D94E",
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 2
    },
    checkBtn: {

    }
})
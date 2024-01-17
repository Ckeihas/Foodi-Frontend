import React, { useCallback } from "react";
import { View, StyleSheet, FlatList, TouchableWithoutFeedback, Text, Image, ImageSourcePropType } from "react-native";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

interface IMealData{
    id: number,
    title: string,
    image: ImageSourcePropType
}
type MealDataType = {
    id: number,
    title: string,
    image: ImageSourcePropType
}
export default function HorizontallScroll({data}: {data: MealDataType[]} ): JSX.Element{

    const renderDataItem = ({item}: {item: MealDataType}) => {
        console.log("Horizontal scroll")
        return(
            <TouchableWithoutFeedback>
                <View style={styles.recipeCardCont}>              
                    <View style={styles.imgShadow}>
                        <Image source={item.image} style={styles.recipeCardImg}/>
                    </View>
                    <View style={styles.cardTextHeaderCont}>
                        <Text style={styles.cardTextHeader}>{item.title}</Text>
                    </View>
                    <View style={styles.cardTextCont}>
                        <View style={styles.timeCont}>
                            <AntDesign name="clockcircleo" size={10} color="#40D94E" />
                            <Text style={styles.cardText}>20m</Text>
                        </View>
                        <View style={styles.calorCont}>
                            <FontAwesome5 name="fire" size={10} color="#40D94E" />
                            <Text style={styles.cardText}>550kcla</Text>
                        </View>
                    </View>                          
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const ShowFlatList = useCallback(() => {
        return(
            <FlatList
            data={data}
            renderItem={renderDataItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            />
        )
    }, [data])
    return(
        <View style={{marginHorizontal: 6}}>
            <ShowFlatList />
        </View>
    )
};

const styles = StyleSheet.create({
    recipeCardCont: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 14,
        marginBottom: 50,
        marginTop: 50,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        width: 130,
        height: 140,
    },
    recipeCardImg: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    imgShadow: {
        top: -30,
        backgroundColor: 'white',
        borderRadius: 100,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    cardTextHeaderCont: {
        marginBottom: 10
    },
    cardTextHeader: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15
    },
    cardTextCont: {
        flexDirection: 'row',
        marginBottom: 20,
        display: 'flex',
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
        marginLeft: 5
    }
})
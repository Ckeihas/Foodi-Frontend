import React, { useCallback } from "react";
import { View, StyleSheet, FlatList, TouchableWithoutFeedback, Text, Image } from "react-native";

export default function HorizontallScroll({data}: any): JSX.Element{

    const renderDataItem = useCallback(() => {
        return(
            <TouchableWithoutFeedback>
                <View style={styles.recipeCardCont}>              
                    <View style={styles.imgShadow}>
                        <Image source={require("../../../assets/food5.jpg")} style={styles.recipeCardImg}/>
                    </View>
                    <View style={styles.cardTextHeaderCont}>
                        <Text style={styles.cardTextHeader}>Recipe Title</Text>
                    </View>
                    <View style={styles.cardTextCont}>
                        <View>
                            <Text style={styles.cardText}>20min</Text>
                        </View>
                        <View>
                            <Text style={styles.cardText}>350cla</Text>
                        </View>
                    </View>                          
                </View>
            </TouchableWithoutFeedback>
        )
    }, [data])
    return(
        <View>
            <Text style={styles.headerText}>Favourites</Text>
            <FlatList
            data={data}
            renderItem={renderDataItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    recipeCardCont: {
        backgroundColor: '#FF6A48',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 50,
        marginTop: 50,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        width: 120,
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
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    cardTextCont: {
        flexDirection: 'row',
        marginBottom: 20,
        display: 'flex',
    },
    cardText: {
        color: 'white',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginHorizontal: 30
    }
})
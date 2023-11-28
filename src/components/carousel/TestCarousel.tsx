import React, { FC, useEffect } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

var { width, height } = Dimensions.get('window');


    const RecipeCard = ({item}: any): JSX.Element => {
    
        const handlePress = () => {
            console.log("pressed")
        }
        return(
            <TouchableWithoutFeedback onPress={() => handlePress()}>
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
    };

    export const OonTyhma= ({data}: any) => {
        console.log("hihii: ", data)
        return(
            <View>
                <Carousel 
                data={data}
                renderItem={({item, index}) => {
                    return(
                        <View></View>
                    )
                }}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width*0.62}
                slideStyle={{display: 'flex', alignItems: 'center'}}
                />
            </View>
        )
    }

   


const styles = StyleSheet.create({
    recipeCardCont: {
        backgroundColor: '#FF6A48',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 50,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        width: 200
    },
    recipeCardImg: {
        top: -50,
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    imgShadow: {
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
})

import React, {useCallback} from "react";
import { View, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, Image, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { mealsData } from "../../dummyData/DummyData";
import { AntDesign } from '@expo/vector-icons';
import { createNavigationContainerRef, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Navigation";
import axios from "axios";
import { XRapidAPIKey, XRapidAPIHost } from "@env"


interface PressedIconDataProps {
    data: mealsData[];
  }

export default function RecipeCard({ data }: PressedIconDataProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const getPressedRecipeData = async (recipeId: number, image: number) => {
        const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/1079930/information',
        headers: {
            'X-RapidAPI-Key': XRapidAPIKey,
            'X-RapidAPI-Host': XRapidAPIHost
        }
    };
        try {
            const response = await axios.request(options);
            // console.log("Nimet: ",response.data.extendedIngredients)
            navigation.navigate("recipeDetails", {
                extendedIngredients: response.data.extendedIngredients,
                readyInMinutes: response.data.readyInMinutes,
                image: response.data.image,
                instructions: response.data.analyzedInstructions,
            })
        } catch (error) {
            console.log(error)
        }
    };

    type mealProps = {
        meal: mealsData
    };
    const MealCard = ({meal}: mealProps) => (
        <TouchableOpacity onPress={() => getPressedRecipeData(12, meal.image)}>
        <View style={styles.mealCardCont}>
            <AntDesign name="heart" size={20} color='orange' style={styles.heartIconPos}/>
            <Image source={meal.image} style={styles.mealCardImg}/>
            <Text>{meal.title}</Text>
        </View>
        </TouchableOpacity>
    );

    const renderMealCard = ({item}: {item: mealsData}) => {
        return(
            <MealCard 
            meal={item}
            />
        )
    };

    const flatlistRender = useCallback(() => {
        return(
            <FlatList
            data={data}
            renderItem={renderMealCard}
            horizontal={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            initialNumToRender={6}
            getItemLayout={getItemLayout}
            />
        )
    }, [data])

    const getItemLayout = (data: any, index: number) => {
        const itemHeight = 130;
        return { length: itemHeight, offset: itemHeight * index, index };
      };

    return(
        <View style={{flex: 1, backgroundColor: 'rgb(252,252,252)'}}>
        <View style={styles.container}>
            {
                flatlistRender()
            }
        </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    mealCardCont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderRadius: 10,
        marginBottom: 12,
        padding: 10,
        height: 230,
        marginHorizontal: 20
    },
    mealCardImg: {
        width: 130,
        height: 130,
        borderRadius: 100
    },
    heartIconPos: {
        position: 'absolute',
        top: 10,
        right: 10
    }
})
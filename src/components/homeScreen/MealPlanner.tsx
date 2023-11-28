import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MealPlanner(): JSX.Element {
    return(
        <View>
            <Text>Meal Planner</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
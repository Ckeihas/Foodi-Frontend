import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Favourites(): JSX.Element {
    return(
        <View>
            <Text>Favourites</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
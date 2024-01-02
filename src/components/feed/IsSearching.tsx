import React from "react";
import { View, StyleSheet, Text } from "react-native"

export default function IsSearching(): JSX.Element {
    return(
        <View>
            <Text>Is searching</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
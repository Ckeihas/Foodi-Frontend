import React, { useEffect } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { CheckAccessToken } from "./auth/CheckAccessToken";
import { GetUserData } from "../api/GetUserData";

export default function SplashScreen(): JSX.Element{

    CheckAccessToken();
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.mainText}>FOODIT</Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 32
    }
})
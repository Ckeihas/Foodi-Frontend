import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeScreenParams } from "../../../navigation/HomeScreenStack";
import RenderCollections from "./RenderCollections";

type HomeScreenProps = NativeStackScreenProps<HomeScreenParams, 'favourites'>
export default function Favourites(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenProps>>();
    return(
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>
                <Text>Friends</Text>
                <TouchableOpacity>
                    <Entypo name="plus" size={24} color="black" />
                </TouchableOpacity>
            </View>
            
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    }
})
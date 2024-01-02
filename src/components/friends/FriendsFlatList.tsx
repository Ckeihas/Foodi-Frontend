import React from "react";
import { FlatList, View, Text, StyleSheet, Image, SafeAreaView, Dimensions } from "react-native";

const data = [
    
    {
        image: require("../../../assets/food5.jpg"),
        name: "Username"
    },
    {
        image: "../../../assets/food5.jpg",
        name: "Username"
    },
    {
        image: require("../../../assets/food5.jpg"),
        name: "Username"
    },
    {
        image: require("../../../assets/food5.jpg"),
        name: "Username"
    },
    {
        image: require("../../../assets/food5.jpg"),
        name: "Username"
    },
    {
        image: require("../../../assets/food5.jpg"),
        name: "Username"
    },
]

type DataType = {
    image: number;
    name: string;
}

const {width, height} = Dimensions.get('window')
export default function FriendsFlatList(): JSX.Element{
    const renderFlatList = ({item}: {item: DataType}) => {
        return(
            <SafeAreaView style={styles.friendContainer}>
                <Image source={require("../../../assets/food5.jpg")} style={styles.image}/>
                <Text style={styles.username}>{item.name}</Text>
            </SafeAreaView>
        )
    }

    const ShowFlatList = () => {
        return(
            <FlatList 
            data={data}
            renderItem={renderFlatList}
            contentContainerStyle={styles.flatListStyles}
            />
        )
    }
    return(
        <View>
            <ShowFlatList />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {},
    friendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    username: {
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 20
    },
    flatListStyles: {
        height: height,
        marginTop: 20
    }
})
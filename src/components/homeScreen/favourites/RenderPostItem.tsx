import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface IPostItem {
    post: any
}
const RenderPostItem = ({item}: {item: IPostItem}) => {
    return(
        <View style={styles.container}>
            <Text>{item.post.title}</Text>
        </View>
    )
};
export default RenderPostItem;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
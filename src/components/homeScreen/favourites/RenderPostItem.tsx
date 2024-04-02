import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

interface IPostItem {
    post: any
}
const RenderPostItem = ({item}: {item: IPostItem}) => {
    return(
        <View style={styles.container}>
            <Image source={{uri: item.post.imageURL}} style={styles.img}/>
            <View style={styles.postInfo}>
                <Text style={styles.titleText}>{item.post.title}</Text>
                <Text style={styles.descriptionText}>
                    {
                        item.post.description.length > 100 ? item.post.description.slice(0,100) + "..." : item.post.description
                    }
                </Text>

                <View style={styles.macrosCont}>
                            <View style={styles.timeCont}>
                                <AntDesign name="clockcircleo" size={10} color="#40D94E" />
                                <Text style={styles.cardText}>20m</Text>
                            </View>
                            <View style={styles.calorCont}>
                                <FontAwesome5 name="fire" size={10} color="#40D94E" />
                                <Text style={styles.cardText}>550kcla</Text>
                            </View>
                            <View style={styles.calorCont}>
                                <MaterialCommunityIcons name="arm-flex-outline" size={10} color="#40D94E" />
                                <Text style={styles.cardText}>16g</Text>
                            </View>
                            <View style={styles.calorCont}>
                                <FontAwesome5 name="weight" size={10} color="#40D94E" />
                                <Text style={styles.cardText}>10g</Text>
                            </View>
                        </View>
            </View>
            
        </View>
    )
};
export default RenderPostItem;


const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        marginHorizontal: 20,
        flexDirection: 'row',
        height: 120,
        
    },
    img: {
        width: 100,
        height: 120,
        borderRadius: 20
    },
    postInfo: {
        marginVertical: 10,
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    titleText: {
        fontWeight: 'bold'
    },
    descriptionText: {
        width: 250
    },
    macrosCont: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    cardText: {
        color: 'black',
        fontSize: 12
    },
    timeCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5
    },
    calorCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5
    },
});
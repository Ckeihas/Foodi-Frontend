import React, {memo} from "react";
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FavoriteParams } from "../../../navigation/FavoritesStack";

interface IFavoriteCollection {
    collectionTitle: string,
    savedPosts: string[],
    collectionImages: string[],
    collectionId: string
};


const RenderCollections = ({collection}: {collection: IFavoriteCollection}) => {
    const navigation = useNavigation<NativeStackNavigationProp<FavoriteParams>>()
   
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.collectionCont} onPress={() => navigation.navigate('collectionItems', {
                itemPaths: collection.savedPosts
            })}>
                {
                    collection.collectionImages.length > 3 ?
                    collection.collectionImages.map((imageUrl: string, index: number) => (
                        <View key={imageUrl}>
                            <Image source={{uri: imageUrl}} style={[ 
                                index == 0 ? styles.collectionImgIndex0 : 
                                index == 1 ? styles.collectionImgIndex1 :
                                index == 2 ? styles.collectionImgIndex2 :
                                styles.collectionImgIndex3
                                ]}
                            />
                        </View>
                        
                    )) :
                    <View style={{backgroundColor: 'lightgray', borderRadius: 8}}>
                        <Image source={{uri: collection.collectionImages[0]}} style={styles.oneCollectionImage}/>
                    </View>
                }
            </TouchableOpacity>
            <Text style={styles.collectionTitle}>{collection.collectionTitle}</Text>
        </View>
    )
};

export default memo(RenderCollections, (prevProps, nextProps) => {
    return prevProps.collection.collectionId === nextProps.collection.collectionId
},);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    collectionCont: {
        width: 170,
        height: 170,
        borderRadius: 8,
        borderWidth: 0.1,
        borderColor: 'black',
        marginHorizontal: 10,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    collectionImgStyle: {
        width: 84,
        height: 84,
        borderRadius: 20
    },
    collectionImgIndex0: {
        width: 84,
        height: 84,
        borderTopLeftRadius: 8,
        marginBottom: 1
    },
    collectionImgIndex1: {
        width: 84,
        height: 84,
        borderTopRightRadius: 8,
        marginBottom: 1
    },
    collectionImgIndex2: {
        width: 84,
        height: 84,
        borderBottomLeftRadius: 8
    },
    collectionImgIndex3: {
        width: 84,
        height: 84,
        borderBottomRightRadius: 8
    },
    collectionTitle: {
        fontWeight: '600',
        fontSize: 13,
        marginTop: 8
    },
    oneCollectionImage: {
        height: 170,
        width: 170,
        borderRadius: 8,
    }

});
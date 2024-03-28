import React, {memo, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { CreateNewAccessToken } from "../../auth/CheckAccessToken";

interface IPostInfo {
    docPath: string,
    docId: string,
    imageUrl: string
}

const RenderCollectionNames = ({item, closeBottomSheet, savedPostInfo}: {item: string, closeBottomSheet: () => void, savedPostInfo?: IPostInfo}) => {
    const [pressedCollection, setPressedCollection] = useState(false);
    
    const AddToCollection = async (collectionTitle: string) => {
        setPressedCollection(() => !pressedCollection);
        setTimeout(() => {closeBottomSheet()}, 500);
        const data = {
            docPath: savedPostInfo?.docPath,
            docId: savedPostInfo?.docId,
            collectionTitle: collectionTitle
        }
        console.log(data)
        await axios.post("http://192.168.1.103:3000/user/posts/add/favourite", {data: data}).then(async (response: any) => {
            const {error, message} = response.data;
            if(error){
                if(await CreateNewAccessToken()){
                    await axios.post("http://192.168.1.103:3000/user/posts/add/favourite", {data: data})
                }
                else {
                    console.log("Add post to general collection")
                }
            }
        })
    };
    return(
        <View style={styles.container}>
            <View style={styles.itemChildCont}>
                <Text>{item}</Text>
                <TouchableOpacity onPress={() => AddToCollection(item)}>
                    {
                        pressedCollection ? 
                        <AntDesign name="checkcircle" size={24} color="black" /> :
                        <AntDesign name="pluscircleo" size={24} color="black"/>
                    }
                    
                </TouchableOpacity>              
            </View>  
        </View>
    )
};

export default memo(RenderCollectionNames, (prevProps, nextProps) => {
    return prevProps.savedPostInfo?.docId === nextProps.savedPostInfo?.docId
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginVertical: 12
    },
    itemChildCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
import React, { useRef, useMemo, useCallback, forwardRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList, BottomSheetTextInput, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import userInfo from "../../mobx/UserInfo";
import { Feather } from '@expo/vector-icons';
import { theme } from "../../theme/theme";

interface Props {
    title: string
};

type Ref = BottomSheet;

interface FriendsData {
    id: string,
    username: string
}


export const CustomBottomSheet = forwardRef<Ref, Props>((title, ref) => {

    const [isSelected, setIsSelected] = useState<{ [key: string]: boolean }>({});
    
    const snapPoints = useMemo(() => ["60%", "100%"], []);

    const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);

    const SendToSelectedUser = ({selectedUser}: {selectedUser: FriendsData}) => {
        console.log(selectedUser)
    }

    const ToggleSelectedUser = (index: number) => {
        console.log(index)
        const key = `${index}`;
        setIsSelected({[key]: !isSelected[key]});
    }

    const renderBottomSheetUI = useCallback(({item, index}: {item: FriendsData, index: number}) => {

        const key = index;
        const selected = isSelected[key] || false;
        return(
            <View>
            <View style={styles.friendContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require("../../../assets/food2.jpg")} style={styles.image}/>
                    <Text style={styles.username}>{item.username}</Text>
                </View> 

                <TouchableOpacity onPress={() => ToggleSelectedUser(index)}>
                    <View style={[styles.selectBox, selected ? {backgroundColor: theme.mainColor} : {backgroundColor: 'white'}]}></View> 
                </TouchableOpacity>           
            </View>
            </View>
        )
    }, [isSelected])
    return(
        <>
        <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        style={{marginTop: 60}}
        >
            <BottomSheetTextInput style={styles.inputField}/>
            <BottomSheetFlatList
            data={userInfo.friends}        
            renderItem={({item, index}) => renderBottomSheetUI({item, index})}
            contentContainerStyle={styles.contentContainer}
            />
            <TouchableOpacity style={styles.sendBtn}>
                <Feather name="send" size={44} color="black" />
            </TouchableOpacity>
        </BottomSheet>
        </>
    )
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 30,
    },
    inputField: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
        marginHorizontal: 30
    },
    friendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30
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
    selectBox: {
        width: 25,
        height: 25,
        borderWidth: 0.2,
        borderRadius: 100,
        marginRight: 30,
    },
    isSelectedBox: {
        width: 25,
        height: 25,
        borderWidth: 0.2,
        borderRadius: 100,
        marginRight: 30,
        backgroundColor: theme.mainColor
    },
    sendBtn: {
        position: 'absolute',
        bottom: 300,
        left: 165
    }
})
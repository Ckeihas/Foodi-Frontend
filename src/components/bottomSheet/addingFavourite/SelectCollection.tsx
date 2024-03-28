import React, { useRef, useMemo, useCallback, forwardRef, useState, memo} from "react";
import { StyleSheet, TouchableOpacity, Dimensions, View, Text, Image } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { AntDesign } from '@expo/vector-icons';
import userInfo from "../../../mobx/UserInfo";
import RenderCollectionNames from "./RenderCollectionNames";
import savedState from "../../../mobx/SavedState";
import CreateCollectionModal from "./CreateCollectionModal";

interface IPostInfo {
    docPath: string,
    docId: string,
    imageUrl: string
}
interface Props {
    title: string;
    postInfo?: IPostInfo,
    closeBottomSheet: () => void;
};

interface ICollectionTitles {
    title: string
}

type Ref = BottomSheetModal;

const {width, height} = Dimensions.get('window');
const SelectCollection = forwardRef<Ref, Props>((props, reference) => {
    const [isModalActive, setModalActive] = useState(false);
    const [collectionTitles, setCollectionTitles] = useState<ICollectionTitles[]>(userInfo.collectionTitles);

    // console.log("kävi", collectionTitles)
    const closeBottomSheet = () => {
        props.closeBottomSheet();
        savedState.isSaved = false;
    }

    const snapPoints = useMemo(() => ["70%"], []);

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

    const NewCollectionTitle = (newTitle: ICollectionTitles) => {
        // console.log("haloooooo")
        // console.log("New title: ", newTitle.title)
        setCollectionTitles(prevTitles => [...prevTitles, newTitle])
    }

    const ToggleModal = () => {
        // console.log("Toggle modal")
        setModalActive(() => !isModalActive)
    }
    return(
        <>
        <BottomSheetModal
        ref={reference}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        style={{marginTop: 60}}
        >
        <TouchableOpacity style={styles.closeBottomSheet} onPress={() => closeBottomSheet()}>
            <AntDesign name="closecircle" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.savedPostHeader}>
            <View style={styles.savedPostCont}>
                <Image source={{uri: props.postInfo?.imageUrl}} style={styles.savedPostImg}/>
                <Text style={styles.savedText}>Saved</Text>
            </View>
            <View style={styles.collectionHeaderTexts}>
                <Text style={styles.collectionText}>Collections</Text>
                <TouchableOpacity onPress={ToggleModal}>
                    <Text style={styles.addNewText}>Add new collection</Text>
                </TouchableOpacity>          
            </View> 
        </View>
        <BottomSheetFlatList 
        data={collectionTitles}
        renderItem={({item}) => <RenderCollectionNames item={item.title} closeBottomSheet={closeBottomSheet} savedPostInfo={props.postInfo}/>}
        contentContainerStyle={styles.scrollViewStyle} 
        />
        <CreateCollectionModal 
        isModalActive={isModalActive} 
        showModal={ToggleModal} 
        NewCollectionTitle={NewCollectionTitle}
        />
        </BottomSheetModal>
        </>
    )
});
export default memo(SelectCollection, (prevProps, nextProps) => {
    return prevProps.postInfo?.docId === nextProps.postInfo?.docId
})

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 30,
    },
    scrollViewStyle: {
        paddingBottom: 150,
        marginHorizontal: 30
    },
    closeBottomSheet: {
        alignItems: 'flex-end',
        marginRight: 20,
        marginBottom: 10,
    },
    savedPostCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    savedPostImg: {
        width: 70,
        height: 70,
        borderRadius: 10
    },
    savedText: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 20
    },
    collectionHeaderTexts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    savedPostHeader: {
        marginHorizontal: 30
    },
    collectionText: {
        fontWeight: 'bold'
    },
    addNewText: {
        fontWeight: '600',
        color: '#2DADF7'
    }
})
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image  } from "react-native";
import { Modal } from "../../components/PopupModal";
import { theme } from "../../theme/theme";
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytesResumable, uploadString, getDownloadURL } from "firebase/storage";
import {addDoc, collection, onSnapshot} from "firebase/firestore"
import { storage } from "../../firebase/config";
import { db } from "../../firebase/config";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import userInfo from "../../mobx/UserInfo";
import { AddNewPostBottomSheet } from "../../components/bottomSheet/AddNewPostBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";

type ImageResultType = {
    assets: ImagePicker.ImagePickerAsset[] | null,
    canceled: boolean
}

interface UploadPostImageProps {
    AddImageUrl: (url: string) => void;
}

interface IToggleModal {
    showModal: () => void;
    AddImageURL: (url: string) => void;
    isModalActive: boolean
}
export default function UploadPostImage({isModalActive, showModal, AddImageURL}: IToggleModal){
    const [isModalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState<string>();

    const uploadImage = async (mode: string) => {
        try {
            let result: ImageResultType = { assets: null, canceled: false };
            if(mode === 'gallery'){
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1
                })
                if(!result.canceled && result.assets){
                    AddImageURL(result.assets[0].uri)
                }
                
            } else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [ 1, 1 ],
                    quality: 1
                })
                if(!result.canceled && result.assets){
                    AddImageURL(result.assets[0].uri)
                }
                
            }
        } catch (error) {
            
        }
    }

    // const SaveImage = async (image: string) => {
    
    //     try {
    //         const storageRef = ref(storage, 'posts/' + uuidv4());
    //         const response = await fetch(image);
    //         const blob = await response.blob();

    //         const uploadTask = uploadBytesResumable(storageRef, blob);

    //         uploadTask.on('state_changed', (snapshot) => {
    //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             console.log('Upload is ' + progress + '% done');
    //         },
    //         (error) => {

    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //                 console.log('File available at', downloadURL);
                    
    //                 AddImageURL(downloadURL)
    //                 showModal();
    //               });
    //         }
    //         )
            
            
    //     } catch (error) {
    //         console.log("error: ", error)
    //     }
    // };

    const UploadToFirebase = () => {

        // 'file' comes from the Blob or File API   

    }

    return(
        <View style={styles.container}>
            <Modal isVisible={isModalActive}>
            <Modal.Container>
                <Modal.Header title="Add image" />
                <Modal.Body>
                    <View style={styles.selectionCont}>
                        <TouchableOpacity style={styles.camera} onPress={() => uploadImage('camera')}>
                            <Feather name="camera" size={24} color={theme.mainColor} />
                            <Text style={styles.selectionTitles}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gallery} onPress={() => uploadImage('gallery')}>
                            <FontAwesome name="photo" size={24} color={theme.mainColor} />
                            <Text style={styles.selectionTitles}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.delete}>
                            <FontAwesome name="trash-o" size={24} color="gray" />
                            <Text style={styles.selectionTitles}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </Modal.Body>
                <Modal.Footer>
                    <View style={styles.modalButtonsCont}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={showModal}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal.Footer>
            </Modal.Container>
        </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        paddingBottom: 10,
        marginLeft: 20,
        marginRight: 20
    },
    selectionCont: {
        marginTop: 30,
        flexDirection: 'row',
        marginBottom: 26,
    },
    icon: {
        marginBottom: 10
    },
    modalButtonsCont: {
        
    },
    addBtn: {
        backgroundColor: theme.mainColor,
        padding: 10,
        borderRadius: 10,
        width: 80,
        alignItems: 'center',
        marginLeft: 30
    },
    addText: {
        color: 'white',
        fontWeight: 'bold'
    },
    cancelBtn: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
        width: 80,
        alignItems: 'center',
    },
    cancelText: {
        color: 'white',
        fontWeight: 'bold'
    },
    camera: {
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        width: 80
    },
    gallery: {
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        width: 80
    },
    delete: {
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        width: 80
    },
    selectionTitles: {
        color: '#7A7A7A',
        marginTop: 5
    }
});
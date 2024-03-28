import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Modal } from "../../PopupModal";
import { theme } from "../../../theme/theme";
import {  MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";
import { debounce } from 'lodash';
import { CreateNewAccessToken } from "../../auth/CheckAccessToken";

interface ICollectionTitles {
    title: string
};

interface IToggleModal {
    showModal: () => void;
    NewCollectionTitle: (newTitle: ICollectionTitles) => void;
    isModalActive: boolean;
};

const url = "http://192.168.1.103:3000/user/create/new/collection"
const CreateCollectionModal = ({isModalActive, showModal, NewCollectionTitle}: IToggleModal) => {
    const [newCollection, setNewCollection] = useState("");

    const GetCollectionNameDebounce = debounce((text: string) => {
        setNewCollection(text)
    }, 300);

    const CreateCollection = async () => {
        try {
            const response = await axios.post(url, {collectionTitle: newCollection})
            const {error} = response.data
            
            if(error) {             
                if(await CreateNewAccessToken()){
                    try {
                        axios.post(url, {collectionTitle: newCollection});
                        NewCollectionTitle({title: newCollection});
                    } catch (error) {
                        console.log("Create new collection failed: ", error)
                    }
                }
            } else {
                NewCollectionTitle({title: newCollection})
                console.log("New collection created successfully: ")
            }
                    
        } catch (error) {
            console.log("Create new collection failed: ", error)
        }
        
    };

    return(
        <View style={styles.container}>
            <Modal isVisible={isModalActive}>
            <Modal.Container>
                <Modal.Header title="Create Collection" />
                <Modal.Body>
                    <View style={styles.inputCont}>
                            <MaterialCommunityIcons 
                            name="file-document-edit-outline" 
                            size={20} 
                            color={theme.mainColor}
                            style={styles.icon}
                            />
                            <TextInput 
                            placeholder="Collection name" 
                            style={styles.inputField}
                            onChangeText={GetCollectionNameDebounce}
                            />
                    </View>
                </Modal.Body>
                <Modal.Footer>
                    <View style={styles.modalButtonsCont}>
                        <TouchableOpacity disabled={newCollection.length <= 0 ? true : false} style={styles.addBtn} onPress={() => {CreateCollection(); showModal();}}>
                            <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
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

export default CreateCollectionModal;

const styles = StyleSheet.create({
    container: {
        
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
        flexDirection: 'row',
       
    },
    addBtn: {
        backgroundColor: theme.mainColor,
        padding: 10,
        borderRadius: 10,
        width: 80,
        alignItems: 'center',
        marginRight: 30
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
    },
    inputCont: {
        marginTop: 30,
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 26,
        width: 250,
    },

});
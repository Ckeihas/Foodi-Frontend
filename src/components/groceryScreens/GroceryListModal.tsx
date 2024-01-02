import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {  MaterialCommunityIcons } from '@expo/vector-icons'; 
import { theme } from "../../theme/theme";
// import { AddNewList } from "../../api/AddNewList";
import { Modal } from "../PopupModal";

type ModalType = {
    AddNewFunction: (title: string) => void;
    index: number;
}

export default function GroceryListModal( {AddNewFunction, index}: any ) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [newlistName, setNewListName] = useState("");

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return(
        <View>
        <Modal isVisible={isModalVisible}>
            <Modal.Container>
                <Modal.Header title="Add new list!" />
                <Modal.Body>
                <View style={styles.inputCont}>
                        <MaterialCommunityIcons 
                        name="file-document-edit-outline" 
                        size={20} 
                        color={theme.mainColor}
                        style={styles.icon}
                        />
                        <TextInput 
                        placeholder="Name of the list" 
                        style={styles.inputField}
                        onChangeText={setNewListName}
                        />
                </View>
                </Modal.Body>
                <Modal.Footer>
                    <View style={styles.modalButtonsCont}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={toggleModal}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={newlistName.length <= 0 ? true : false} style={styles.addBtn} onPress={() => {toggleModal(); AddNewFunction(newlistName, index);}}>
                            <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </Modal.Footer>
            </Modal.Container>
        </Modal>
        <TouchableOpacity style={styles.newListBtnContainer} onPress={toggleModal}>
                <View style={styles.newListBtn}>
                    <Text style={styles.newListText}>Add New List +</Text>
                </View>
        </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    newListBtnContainer: {
        backgroundColor: theme.mainColor,
        marginHorizontal: 80,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 30,
        shadowColor: '#171717',
        shadowOffset: {width: 1, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    newListBtn: {
        alignItems: 'center',
        height: 60,
        justifyContent: 'center'
    },
    newListText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    inputField: {
        paddingBottom: 10,
        marginLeft: 20,
        marginRight: 20
    },
    inputCont: {
        marginTop: 30,
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 26,
        width: 250,
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
        marginRight: 30
    },
    cancelText: {
        color: 'white',
        fontWeight: 'bold'
    }
})
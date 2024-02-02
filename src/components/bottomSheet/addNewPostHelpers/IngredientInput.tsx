import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

interface Ingredient {
    id: string;
    name: string;
    amount: string;
    unit: string;
}

interface IngredientInputProps {
    handleChange: (index: number, key: string, value: string) => void;
    DeleteInputField: (value: string) => void;
    input: Ingredient,
    index: number
};

const { width, height } = Dimensions.get('window');

export const IngredientInput: React.FC<IngredientInputProps> = ({
    handleChange,
    DeleteInputField,
    input,
    index
}) => {

    return(
        <View key={input.id} style={styles.ingredientsCont}>
            <BottomSheetTextInput 
            style={styles.ingredientInput} 
            placeholder="Ingredient"
            onChangeText={(value) => handleChange(index, 'name', value)}
            />                
            <BottomSheetTextInput 
            style={styles.amountInput} 
            placeholder="1"
            onChangeText={(value) => handleChange(index, 'amount', value)}
            />                
            <BottomSheetTextInput 
            style={styles.amountInput} 
            placeholder="Unit"
            onChangeText={(value) => handleChange(index, 'unit', value)}
            />                                 
            <TouchableOpacity style={styles.deleteCont} onPress={() => DeleteInputField(input.name)}>
                <FontAwesome name="trash-o" size={24} color="red" />
            </TouchableOpacity>
        </View> 
    )
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 30,
    },
    titleInput: {
        width: width / 1.2,
        borderBottomWidth: 0.2,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        marginTop: 40,
    },
    descriptionInput: {
        width: width / 1.2,
        borderBottomWidth: 0.2,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        marginTop: 40,
    },
    ingreadientHeader: {
        fontSize: 16,
        color: 'gray',
        padding: 8,
        marginTop: 40,
        marginLeft: 30
    },
    ingredientsCont: {
        flexDirection: 'row',
        marginTop: 20,
    },
    ingredientInput: {
        width: 150,
        borderBottomWidth: 0.2,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
    },
    amountInput: {
        width: 50,
        borderBottomWidth: 0.2,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        marginLeft: 20
    },
    addBtn: {
        backgroundColor: 'lightgray',
        width: 100,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    imageCont: {
        alignItems: 'center'
    },
    image: {
        width: 250,
        height: 250,    
    },
    scrollViewStyle: {
        paddingBottom: 150
    },
    deleteCont: {
        justifyContent: 'flex-end',
        marginLeft: 20
    },
    instructionsCont: {
        alignItems: 'flex-start'
    }
})
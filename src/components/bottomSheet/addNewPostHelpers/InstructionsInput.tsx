import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { FontAwesome } from '@expo/vector-icons';
import { theme } from "../../../theme/theme";

interface Instruction {
    id: string,
    text: string
}

interface InstructionInputProps {
    handleIstructionChange: (index: number, value: string) => void,
    deleteInstruction: (value: string) => void,
    input: Instruction,
    index: number
}
export const InstructionsInput: React.FC<InstructionInputProps> = ({
    handleIstructionChange,
    deleteInstruction,
    input,
    index
}) => {
    return(
        <View key={input.id} style={styles.container}>
            <View style={styles.stepNumberCont}>
                <Text style={{color: 'white'}}>{index + 1}</Text>
            </View>
            <View style={{marginHorizontal: 30, marginVertical: 10}}>
                <BottomSheetTextInput 
                style={styles.instructionInput} 
                placeholder="Ingredient"
                onChangeText={(value) => handleIstructionChange(index, value)}
                multiline={true}
                /> 
            </View>
                                                            
            <TouchableOpacity onPress={() => deleteInstruction(input.id)}>
                <FontAwesome name="trash-o" size={24} color="red" />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    instructionInput: {
        width: 200,
        height: 80,
        borderWidth: 0.2,
        padding: 5,
        borderRadius: 5
    },
    stepNumberCont: {
        backgroundColor: theme.mainColor,
        height: 30,
        width: 30,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
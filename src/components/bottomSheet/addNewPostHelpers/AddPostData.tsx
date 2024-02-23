import React, { RefObject } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, Text } from "react-native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Feather } from '@expo/vector-icons';
import { IngredientInput } from "./IngredientInput";
import { InstructionsInput } from "./InstructionsInput";
import UploadPostImage from "../../uploadImage/UploadPostImage";
import { TextInput } from "react-native-gesture-handler";

interface AddNewPostContentProps {
  formData: FormData;
  handleTitleChange: (value: string) => void;
  handleDescriptionChange: (value: string) => void;
  handleChange: (index: number, key: string, value: string) => void;
  handleInstructionChange: (index: number, value: string) => void;
  AddNewInputField: () => void;
  AddNewInstructionField: () => void;
  AddImageURL: (url: string) => void;
  createJSON: () => void;
  DeleteInputField: (value: string) => void;
  DeleteInstructionField: (id: string) => void;
  toggleModal: () => void;
  isModalActive: boolean;
  titleInputRef: RefObject<TextInput>;
  descriptionInputRef: RefObject<TextInput>;
};

interface FormData {
  imageURL: string,
  title: string;
  description: string;
  extendedIngredients: { id: string, name: string; amount: string; unit: string }[];
  analyzedInstructions: {id: string, step: string, number: number}[];
}

const { width, height } = Dimensions.get('window')
export const AddPostData: React.FC<AddNewPostContentProps> = ({
  formData,
  handleTitleChange,
  handleDescriptionChange,
  handleChange,
  handleInstructionChange,
  AddNewInputField,
  AddNewInstructionField,
  AddImageURL,
  createJSON,
  DeleteInputField,
  DeleteInstructionField,
  toggleModal,
  isModalActive,
  titleInputRef,
  descriptionInputRef,
}) => {
  
    return(
      <View>
      <TouchableOpacity style={styles.imageCont} onPress={toggleModal}>
          {
            formData.imageURL ?
            <Image source={{uri: formData.imageURL}} style={styles.image}/> : 
            <View style={styles.fallBackImage}>
              <Feather name="image" size={100} color="black"/>
            </View>
            
          }
          
      </TouchableOpacity>
      <UploadPostImage isModalActive={isModalActive} showModal={toggleModal} AddImageURL={AddImageURL}/>
      <View style={{alignItems: 'center'}}>
          <BottomSheetTextInput 
          style={styles.titleInput} 
          placeholder="Title"
          ref={titleInputRef}
          onChangeText={(value) => handleTitleChange(value)}
          />
          <BottomSheetTextInput 
          style={styles.descriptionInput}
          placeholder="Description"
          ref={descriptionInputRef}
          onChangeText={(value) => handleDescriptionChange(value)}
          />
      </View>
      <Text style={styles.ingreadientHeader}>Add Ingredients:</Text>
      <View style={{alignItems: 'center', marginHorizontal: 30}}>
          <View>
              {
                  formData.extendedIngredients.map((input, index) => (                             
                    <IngredientInput
                    key={input.id}
                    input={{ id: input.id, name: input.name, amount: input.amount, unit: input.unit }}
                    index={index}
                    handleChange={handleChange}
                    DeleteInputField={DeleteInputField}
                    />                      
                  ))
              }
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={AddNewInputField}>
              <Text>Add More +</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addBtn} onPress={createJSON}>
              <Text>Create JSON</Text>
          </TouchableOpacity>
      </View>

      <Text style={styles.ingreadientHeader}>Instrucions</Text>
      <View style={styles.instructionsCont}>
          <View>
            {
              formData.analyzedInstructions.map((input, index) => (
                <InstructionsInput 
                key={input.id}
                input={{id: input.id, text: input.step}}
                index={index}
                handleIstructionChange={handleInstructionChange}
                deleteInstruction={DeleteInstructionField}
                />
              ))
            }
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={AddNewInstructionField}>
              <Text>Add Instruction +</Text>
          </TouchableOpacity>
      </View>
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
      alignItems: 'center',
  },
  image: {
      width: 250,
      height: 250,
      backgroundColor: 'gray'   
  },
  fallBackImage: {
      width: 250,
      height: 250,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.3
  },
  scrollViewStyle: {
      paddingBottom: 150
  },
  deleteCont: {
      justifyContent: 'flex-end',
      marginLeft: 20
  },
  instructionsCont: {
      alignItems: 'center'
  }
})
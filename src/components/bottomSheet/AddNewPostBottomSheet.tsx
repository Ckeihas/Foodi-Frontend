import React, { useRef, useMemo, useCallback, forwardRef, useState} from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import userInfo from "../../mobx/UserInfo";
import { AntDesign } from '@expo/vector-icons';
import { v4 as uuidv4 } from "uuid"
import { AddPostData } from "./addNewPostHelpers/AddPostData";
import {addDoc, collection, onSnapshot, serverTimestamp} from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";
import { db } from "../../firebase/config";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { CreateNewAccessToken } from "../auth/CheckAccessToken";

interface Props {
    title: string,
    closeBottomSheet: () => void;
};

type Ref = BottomSheet;


// extendedIngredients[{"amount": x, "unit": x, "name": x}]
// "readyInMinutes": "20"
// "image": "xxxxxxxx"
// analyzedInstructions: "steps": [Array]
// "title": "x"
// "summary": "x"
interface Step {
    number: number;
    step: string;
  }
  
  interface Instructions {
    steps: Step[];
  }
const { width, height } = Dimensions.get('window')
export const AddNewPostBottomSheet = forwardRef<Ref, Props>((props, reference) => {

    //--------------------------------------------------------------------
    interface FormData {
        imageURL: string;
        title: string;
        description: string;
        extendedIngredients: { id: string, name: string; amount: string; unit: string }[];
        analyzedInstructions: {id: string, step: string, number: number}[];
      }
    
      const [formData, setFormData] = useState<FormData>({
        imageURL: '',
        title: '',
        description: '',
        extendedIngredients: [],
        analyzedInstructions: []
      });
      console.log(formData)
      const [isModalVisible, setModalVisible] = useState(false);

      const inputField = [...formData.extendedIngredients];
      const instructionInputFiels = [...formData.analyzedInstructions]

      const titleInputRef = useRef<TextInput | null>(null);
      const descriptionInputRef = useRef<TextInput | null>(null);

      const handleChange = (index: number, key: string, value: string) => {
        const updatedIngredients = [...inputField];
        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [key]: value,
          };
    
        setFormData({
          ...formData,
          extendedIngredients: updatedIngredients,
        });
      };

      const handleInstructionChange = (index: number, step: string) => {
        const updatedInstructions = [...instructionInputFiels];
        updatedInstructions[index] = {
            ...updatedInstructions[index],
            step,
          };
    
        setFormData({
          ...formData,
          analyzedInstructions: updatedInstructions,
        });
      }

      const handleTitleChange = (value: string) => {
        console.log("Handle title change")
        setFormData({
          ...formData,
          title: value,
        });
      };
    
      const handleDescriptionChange = (value: string) => {
        console.log("Handle description change")
        setFormData({
          ...formData,
          description: value,
        });
      };
    
      const AddNewInputField = () => {
        console.log("Add new input field")
        setFormData({
          ...formData,
          extendedIngredients: [...inputField, { id: uuidv4(), name: '', amount: '', unit: '' }],
        });
      };

      const AddNewInstructionField = () => {
        console.log("Add new instruction field")
        setFormData({
          ...formData,
          analyzedInstructions: [...instructionInputFiels, { id: uuidv4(), step: '', number: formData.analyzedInstructions.length + 1}],
        });
      };
    
      const DeleteInputField = (value: string) => {
        console.log("Pressed index: ", value)
        setFormData((prevFormData) => ({
          ...prevFormData,
          extendedIngredients: prevFormData.extendedIngredients.filter(item => item.name !== value),
        }));
      };

      const DeleteInstructionField = (id: string) => {
        console.log("Pressed instruction: ", id)
        setFormData((prevFormData) => ({
          ...prevFormData,
          analyzedInstructions: prevFormData.analyzedInstructions.filter(item => item.id !== id),
        }));
      };
    
      const AddImageURL = (url: string) => {
        setFormData({
            ...formData,
            imageURL: url,
          });
      };

      const createJSON = async () => {
        const { imageURL, title, description, extendedIngredients, analyzedInstructions } = formData;

       
        try {
            const storageRef = ref(storage, 'posts/' + uuidv4());
            const response = await fetch(imageURL);
            const blob = await response.blob();

            const uploadTask = uploadBytesResumable(storageRef, blob);

            props.closeBottomSheet();
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {

            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL: string) => {
                    console.log('File available at', downloadURL);
                    
                    const jsonObject = {
                        downloadURL,
                        title,
                        description,
                        extendedIngredients,
                        analyzedInstructions,
                      };
                  
                      console.log('JSON Object:', jsonObject);
                      await addDoc(collection(db, 'posts'), {
                          id: userInfo.currentUser.id,
                          username: userInfo.currentUser.username,
                          imageURL: downloadURL,
                          title: title,
                          description: description,
                          extendedIngredients: extendedIngredients,
                          analyzedInstructions: analyzedInstructions,
                          timestamp: serverTimestamp()
                      }).then(() => {
                        console.log("Post upload successfull")
                        setFormData({
                            imageURL: '',
                            title: '',
                            description: '',
                            extendedIngredients: [],
                            analyzedInstructions: []
                        })
                        
                      }).catch((error) => {
                        console.log("Error uploadin post: ", error)
                      })
                      
                  });
            }
            )
            
            
        } catch (error) {
            console.log("error: ", error)
        }
    };

    const closeBottomSheet = () => {
        props.closeBottomSheet();
        titleInputRef.current?.clear();
        descriptionInputRef.current?.clear();
        setFormData({
            imageURL: '',
            title: '',
            description: '',
            extendedIngredients: [],
            analyzedInstructions: []
        })
    }
    //------------------------------------------------------------------------------------------


    
    //console.log(inputField)
    const snapPoints = useMemo(() => ["100%"], []);

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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return(
        <>
        <BottomSheet
        ref={reference}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        style={{marginTop: 60}}
        >
        <TouchableOpacity style={styles.closeBottomSheet} onPress={closeBottomSheet}>
            <AntDesign name="closecircle" size={24} color="black" />
        </TouchableOpacity>
          <BottomSheetScrollView contentContainerStyle={styles.scrollViewStyle}>
            <AddPostData 
            formData={formData}
            handleTitleChange={handleTitleChange}
            handleDescriptionChange={handleDescriptionChange}
            handleChange={handleChange}
            handleInstructionChange={handleInstructionChange}
            AddNewInputField={AddNewInputField}
            AddNewInstructionField={AddNewInstructionField}
            AddImageURL={AddImageURL}
            createJSON={createJSON}
            DeleteInputField={DeleteInputField}
            DeleteInstructionField={DeleteInstructionField}
            toggleModal={toggleModal}
            isModalActive={isModalVisible}
            titleInputRef={titleInputRef}
            descriptionInputRef={descriptionInputRef}
            />
            
          </BottomSheetScrollView>

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
    },
    closeBottomSheet: {
        alignItems: 'flex-end',
        marginRight: 20,
        marginBottom: 10,
    }
})
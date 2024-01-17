import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, TouchableWithoutFeedback, Button} from "react-native";
import { RootStackParamList } from "../navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons'; 
import BottomSheet, { BottomSheetScrollView, BottomSheetModal, BottomSheetModalProvider, } from "@gorhom/bottom-sheet";
import axios from "axios";

var { width, height } = Dimensions.get('window');
type RecipeDetailsProps = NativeStackScreenProps<RootStackParamList, 'recipeDetails'>
export default function RecipeDetails({route}: RecipeDetailsProps): JSX.Element {
    const [selectedIcon, setSelectedIcon] = useState<number>(0);
    //Key value pair key = index_stepindex value = boolean
    const [isDone, setIsDone] = useState<{ [key: string]: boolean }>({});

    const { extendedIngredients, image, readyInMinutes, instructions } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    console.log("AINEET: ", extendedIngredients)
    // console.log("KUVA: ", image);
    // console.log("VALMIS: ", readyInMinutes)
    // console.log("OHJEET: ", instructions)

    // instructions.map((item, index) => {
    //     console.log(item.steps)
    //     item.steps.map((item: any) => {
    //         console.log(item.number)
    //         console.log(item.step)
    //     })
    // })
    const sheetRef = useRef<BottomSheet>(null);
    
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePress = () => bottomSheetModalRef.current?.present();
    
    const snapPoints = useMemo(() => ["50%", "90%"], []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
      }, []);

    const BottomSheetBackground = ({style}: any) => {
        return (
          <View
            style={[
              {
                backgroundColor: 'white',
                borderTopRightRadius: 50
              },
              {...style},
            ]}
          >
            <View style={styles.heartIconCont}>
                <AntDesign name="heart" size={20} color='red'/>
            </View>
          </View>
        );
    };

    const handleIconClick = (index: number) => {
        setSelectedIcon(index);
      };

    const icons = [
        {
            black: require("../../assets/food.png"),
            white: require("../../assets/foodWhite.png"),
            style: styles.ingredientsIcon,
          },
          {
            black: require("../../assets/cooking.png"),
            white: require("../../assets/cookingWhite.png"),
            style: styles.cookingIcon,
          },
    ];

    const showIngredients = useCallback(() => {
        return(
            <View style={{marginTop: 30}}>
                {extendedIngredients.map((item, index) => (
                    <View key={index}>
                        <View style={styles.ingredientsCont}>
                            <Text style={styles.amountText}>
                                {
                                    item.amount % 1 !== 0 ?
                                    parseFloat(item.amount.toFixed(1)) :
                                    item.amount         
                                }
                            </Text>
                            <Text style={styles.unitText}>{item.unit}</Text>
                            <Text style={styles.nameText}>{item.name}</Text>
                        </View>
                        <View style={styles.line}></View>
                    </View>
                ))}
            </View>
        )
    }, []);

    const handleStepPress = (index: number, stepIndex: number) => {
        const key = `${index}_${stepIndex}`;
        setIsDone({ ...isDone, [key]: !isDone[key] });
      };
    const showInstructions = () => {
        return(
            <View>
                {instructions.map((item, index) => {
                    return(
                        <View key={index}>
                            {item.steps.map((item: any, stepIndex: number) => {
                                const key = `${index}_${stepIndex}`;
                                const taskDone = isDone[key] || false;
                                return(
                                    <TouchableOpacity key={stepIndex} style={styles.instructionsCont} onPress={() => handleStepPress(index, stepIndex)}>  
                                        <View style={[styles.numberCont, { backgroundColor: taskDone ? "#FF6A48" : 'white' }]}>
                                            {
                                                taskDone ? 
                                                <Entypo name="check" size={20} color='white'/> :
                                                <Text>{item.number}</Text>
                                            }
                                        </View>     
                                        <Text style={[styles.instructionText, {color: taskDone ? 'lightgray' : '#393939'}]}>{item.step}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    )
                })}
            </View>
        )
    };

    //Pasta bolognese haku id 1079930 ja x key 4fc4f2ddb8msh16bf5abbb62947cp19168cjsnf7273f935b83



    return(
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.gobackIcon}>
                    <Ionicons name="chevron-back-outline" size={30} color="white" />
                </TouchableOpacity>
                <SafeAreaView style={styles.imgCont}>
                    <Image source={{uri: image}} style={styles.mealImg}/>
                </SafeAreaView>
            </View>
            <Button title="press" onPress={handlePress}></Button>
            <BottomSheet
                ref={sheetRef}
                index={0}
                snapPoints={snapPoints}
                backgroundComponent={props => <BottomSheetBackground {...props} />}
                containerHeight={100}
            >
                
                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.recipeTitle}>Recipe name</Text>
                    <View style={styles.ingredientsCookIconsCont}>
                        {icons.map((icon, index) => (
                            <TouchableOpacity 
                            key={index}
                            onPress={() => handleIconClick(index)}
                            style={[{
                                backgroundColor: selectedIcon === index ? '#FF6A48' : 'white'
                            }, styles.IconsCont]}
                            >
                                <Image source={selectedIcon === index ? icon.white : icon.black} style={icon.style}/>

                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{marginTop: 30}}>
                        {
                            selectedIcon === 0 ? 
                            showIngredients() :
                            showInstructions()
                        }
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
            <TouchableOpacity style={styles.addGroceries}>
                <FontAwesome5 name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6A48'
    },
    contentContainer: {
        marginHorizontal: 20,
        marginTop: 10
    },
    recipeTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    imgCont: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    mealImg: {
        width: width * 0.75,
        height: height * 0.35,
        borderRadius: 1000,
    },
    gobackIcon: {
        position: 'absolute',
        zIndex: 20,
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    bottomSheetStyle: {
        borderTopRightRadius: 90
    },
    heartIconCont: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 100,
        right: 40,
        top: -20,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    ingredientsCookIconsCont: {
        flexDirection: 'row'
    },
    IconsCont: {
        padding: 10,
        borderRadius: 100,
        marginTop: 10,
        marginHorizontal: 5
    },
    ingredientsIcon: {
        width: 35,
        height: 35
    },
    cookingIcon: {
        width: 35,
        height: 35
    },
    ingredientsCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 5
    },
    unitText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 10
    },
    nameText: {
        fontSize: 16,
    },
    line: {
        borderColor: '#E0E0E0',
        borderBottomWidth: 1,
        width: width * 0.9,
        marginTop: 15,
        marginBottom: 15,
    },
    instructionsCont: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'flex-start'
    },
    numberCont: {
        padding: 10,
        marginRight: 10,
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: 'center',
        borderWidth: 0.5
    },
    instructionText: {
        marginRight: 60,
        fontWeight: '500',
        fontSize: 15,
        
    },
    addGroceries: {
        position: 'absolute',
        backgroundColor: '#FF6A48',
        borderRadius: 100,
        alignItems: 'center',
        padding: 14,
        right: 50,
        bottom: 30
    }
})
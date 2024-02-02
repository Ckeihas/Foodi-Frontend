// const RenderPostInfo = useCallback(() => {
    //     console.log("Again")
    //     return(
    //         <View>
    //             <View style={styles.imageCont}>
    //                 <Image source={require("../../../assets/food3.jpg")} style={styles.image}/>
    //             </View>
    //             <View style={{alignItems: 'center'}}>
    //                 <BottomSheetTextInput 
    //                 style={styles.titleInput} 
    //                 placeholder="Title"
    //                 onChangeText={(value) => handleTitleChange(value)}
    //                 />
    //                 <BottomSheetTextInput 
    //                 style={styles.descriptionInput}
    //                 placeholder="Description"
    //                 onChangeText={(value) => handleDescriptionChange(value)}
    //                 />
    //             </View>
    //             <Text style={styles.ingreadientHeader}>Add Ingredients:</Text>
    //             <View style={{alignItems: 'center', marginHorizontal: 30}}>
    //                 <View>
    //                     {
    //                         inputField.map((input, index) => (                             
    //                             <View key={input.id} style={styles.ingredientsCont}>
    //                                 <BottomSheetTextInput 
    //                                 style={styles.ingredientInput} 
    //                                 placeholder="Ingredient"
    //                                 onChangeText={(value) => handleChange(index, 'ingredient', value)}
    //                                 />
    //                                 <BottomSheetTextInput 
    //                                 style={styles.amountInput} 
    //                                 placeholder="1"
    //                                 onChangeText={(value) => handleChange(index, 'amount', value)}
    //                                 />
    //                                 <BottomSheetTextInput 
    //                                 style={styles.amountInput} 
    //                                 placeholder="Unit"
    //                                 onChangeText={(value) => handleChange(index, 'unit', value)}
    //                                 />
    //                                 <TouchableOpacity style={styles.deleteCont} onPress={() => DeleteInputField(input.ingredient)}>
    //                                     <FontAwesome name="trash-o" size={24} color="red" />
    //                                 </TouchableOpacity>
    //                             </View>                      
    //                         ))
    //                     }
    //                 </View>
    //                 <TouchableOpacity style={styles.addBtn} onPress={AddNewInputField}>
    //                     <Text>Add More +</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={styles.addBtn} onPress={createJSON}>
    //                     <Text>Create JSON</Text>
    //                 </TouchableOpacity>
    //             </View>

    //             <View style={styles.instructionsCont}>
    //                 <Text style={styles.ingreadientHeader}>Instrucions</Text>
    //                 <View>

    //                 </View>
    //             </View>
    //         </View>
    //     )
    // }, [formData])
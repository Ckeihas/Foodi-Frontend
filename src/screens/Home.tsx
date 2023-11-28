import React, {  useState } from "react";
import { Text, SafeAreaView, StyleSheet, Image, View, Button, TouchableOpacity } from "react-native"
import { AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import PressedIconData from "../components/homeScreen/RecipeCard";
import { Data, mealsData } from "../dummyData/DummyData";


export default function Home(): JSX.Element{
    const [selectedIcon, setSelectedIcon] = useState<number>(0);

    const handleIconClick = (index: number) => {
      setSelectedIcon(index);
    };
    const profileImage = false;

    const icons = [
        <AntDesign 
        name="heart" 
        size={20} 
        color={selectedIcon === 0 ? 'white' : 'black'}
        style={styles.icon}/>,

        <MaterialCommunityIcons 
        name="food" 
        size={20} 
        color={selectedIcon === 1 ? 'white' : 'black'}
        style={styles.icon}/>,

        <FontAwesome5 
        name="user-friends" 
        size={20} 
        color={selectedIcon === 2 ? 'white' : 'black'} 
        style={styles.icon}/>,

        <MaterialCommunityIcons 
        name="calendar-clock" 
        size={20} 
        color={selectedIcon === 3 ? 'white' : 'black'} 
        style={styles.icon}/>,
      ];
    return(
        <SafeAreaView style={styles.container}>
            <View>
                {
                    profileImage ? 
                    <Image source={require("../../assets/favicon.png")}/> : 
                    <View style={styles.imageCont}></View>
                }
                <Text>Username</Text>
            </View>
            <View style={styles.iconsCont}>
                {icons.map((icon, index) => (
                    <TouchableOpacity
                    key={index}
                    onPress={() => handleIconClick(index)}
                    style={[{
                        backgroundColor: selectedIcon === index ? 'orange' : 'white'
                    }, styles.iconCont]}
                    >
                        {icon}                   
                    </TouchableOpacity>
                ))}
            </View>
                <PressedIconData data = {Data}/>     
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45
    },
    imageCont: {
        borderColor: 'black',
        borderWidth: 1,
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    iconsCont: {
        flexDirection: 'row',
        margin: 20,
    },
    icon: {
        
        // backgroundColor: 'green',
        // padding: 10,
        // borderRadius: 10
    },
    iconCont: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10
    }
})
import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import CarouselView from "../components/carousel/CarouselView";
import HorizontallScroll from "../components/carousel/HorizontallScroll";
import { theme } from "../theme/theme";
import IsSearching from "../components/feed/IsSearching";

interface TestCarouselItem {
    id: number,
    testi?: string,
    image?: number,
};

const testii: TestCarouselItem[] = [
    {
        id: 0,
        testi: "MOI",
        image: require("../../assets/food5.jpg")
    },
    {
        id: 1,
        testi: "MOI",
        image: require("../../assets/food5.jpg")
    },
    {
        id: 2,
        testi: "MOI",
        image: require("../../assets/food5.jpg")
    },
    {
        id: 3,
        testi: "MOI",
        image: require("../../assets/food5.jpg")
    },
    {
        id: 4,
        testi: "MOI",
        image: require("../../assets/food5.jpg")
    },
    {
        id: 5,
        testi: "MOI",
        image: require("../../assets/food5.jpg")
    },
    {
        id: 6,
        testi: "MOI",
        image: require("../../assets/food5.jpg")
    },
    {
        id: 7,
        testi: "MOI",
        image: require("../../assets/food5.jpg")
    },
    {
        id: 8,
        testi: "MOI",
        image: require("../../assets/food5.jpg")
    },
    {
        id: 9,
        testi: "MOI",
        image: require("../../assets/food5.jpg")
    },
    ];

export default function FeedScreen(){
    const [search, setSearch] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedIcon, setSelectedIcon] = useState(0)
    const icons = [
        {
            icon: (
                <MaterialCommunityIcons 
                name="silverware-fork-knife" 
                size={20} 
                color={selectedIcon === 0 ? 'white' : 'black'}
                style={styles.icon}/>
            ),
            name: "All"
        },
        {
            icon: (
                <MaterialCommunityIcons 
                name="food-turkey" 
                size={20} 
                color={selectedIcon === 1 ? 'white' : 'black'}
                style={styles.icon}/>
            ),
            name: "Lunch"
        },
        {
            icon: (
                <MaterialIcons 
                name="free-breakfast" 
                size={20} 
                color={selectedIcon === 2 ? 'white' : 'black'} 
                style={styles.icon}/>
            ),
            name: "Breakfast"
        },
        {
            icon: (
                <MaterialCommunityIcons 
                name="cupcake" 
                size={20} 
                color={selectedIcon === 3 ? 'white' : 'black'} 
                style={styles.icon}/>
            ),
            name: "Dessert"
        }

      ];
      const handleIconClick = (index: number) => {
        setSelectedIcon(index);
      };

    return(
        <SafeAreaView style={styles.container}>
        <ScrollView>
             <View style={styles.headerTextCont}>
                <Text style={styles.headerText}>Good Morning!</Text>
             </View>
            <View style={styles.header}>
                <View style={styles.inputCont}>
                        <FontAwesome 
                        name="search" 
                        size={20} 
                        color={theme.mainColor}
                        style={styles.icon}
                        />
                        <TextInput 
                        placeholder="Username" 
                        style={styles.inputField}
                        onChangeText={setSearch}
                        onPressIn={() => setIsSearching(true)}
                        />
                </View>
                
            </View>
            {
                isSearching ? 
                <IsSearching /> :
                <>
                <ScrollView 
                style={styles.filtersCont}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                >
                    {icons.map((icon, index) => (
                        <TouchableOpacity
                        key={index}
                        style={[{
                            backgroundColor: selectedIcon === index ? theme.mainColor : 'white'
                        }, styles.filterIcon]}
                        onPress={() => handleIconClick(index)}
                        >
                        <View>
                        {icon.icon}
                        </View>
                        <Text style={[{
                            color: selectedIcon === index ? 'white' : 'black'},
                            styles.filterName
                        ]}
                        >
                            {icon.name}
                        </Text>            
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <CarouselView />
                <HorizontallScroll data={testii}/>
            </>
            }
            
        </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    header: {
        alignItems: 'center'
    },
    headerTextCont: {
        marginHorizontal: 30,
        marginVertical: 30
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 26
    },
    inputField: {
        paddingBottom: 10,
        marginRight: 20
    },
    inputCont: {
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 26,
        width: 300,
    },
    icon: {
        marginBottom: 6
    },
    filtersCont: {
        flexDirection: 'row',
        margin: 20,
    },
    filterIcon: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: 90,
    },
    filterName: {
        fontWeight: '500',
        fontSize: 12
    }

});
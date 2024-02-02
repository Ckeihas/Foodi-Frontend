import React, { useCallback } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeScreenParams } from "../../../navigation/HomeScreenStack";
import { MealPlannerParams } from "../../../navigation/MealPlannerStack";
import { theme } from "../../../theme/theme";
import ProgressBar from "../../progressBar/ProgressBar";
import ProgressCircle from "../../progressBar/ProgressCircle";
import HorizontallScroll from "../../carousel/HorizontallScroll";

interface TestCarouselItem {
    id: number,
    title?: string,
    image?: number,
};

const testii= [
    {
        id: 0,
        title: "Breakfast",
        image: require("../../../../assets/food3.jpg")
    },
    {
        id: 1,
        title: "Lunch",
        image: require("../../../../assets/food3.jpg")
    },
    {
        id: 2,
        title: "Lunch nmr 2",
        image: require("../../../../assets/food3.jpg")
    },
    {
        id: 3,
        title: "Snack",
        image: require("../../../../assets/food3.jpg")
    },
    {
        id: 4,
        title: "Dinner",
        image: require("../../../../assets/food3.jpg")
    },
    {
        id: 5,
        title: "MOI",
        image: require("../../../../assets/food3.jpg")
    },
    ];




type HomeScreenProps = NativeStackScreenProps<HomeScreenParams, 'mealPlanner'>

const { width, height } = Dimensions.get('window');
export default function MealPlanner(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenProps>>();
    const mealNav = useNavigation<NativeStackNavigationProp<MealPlannerParams>>();
    return(
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackBtn}>
                <Ionicons name="chevron-back-outline" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.overviewBox}>
            <ProgressCircle weight={103}/>
                <View style={styles.macrosCont}>
                    <View style={{flexDirection: 'column', alignItems: 'center', marginLeft: 30}}>
                        <Text style={styles.macrosHeader}>Carbs</Text>
                        <ProgressBar maxValue={200} currentValue={152}/>
                        <Text style={styles.macroAmounts}>154/200g</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={styles.macrosHeader}>kcal</Text>
                        <ProgressBar maxValue={1500} currentValue={400}/>
                        <Text style={styles.macroAmounts}>154/200g</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 30}}>
                        <Text style={styles.macrosHeader}>Protein</Text>
                        <ProgressBar maxValue={167} currentValue={80}/>
                        <Text style={styles.macroAmounts}>154/200g</Text>
                    </View>
                </View>
            </View>

            <View style={{marginTop: 40}}>
                <View style={styles.mealsHeadersCont}>
                    <Text style={styles.todaysMealsText}>Today's meals</Text>
                    <TouchableOpacity onPress={() => mealNav.navigate('mealCalendar')}>
                        <Text style={styles.openCalendarText}>Open Calendar</Text>
                    </TouchableOpacity>
                </View>
                <HorizontallScroll data={testii}/>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    goBackBtn: {
        position: 'absolute',
        left: 30,
        top: 50,
        zIndex: 2
    },
    overviewBox: {
        backgroundColor: '#40D94E',
        height: 350,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    currentWeightCont: {
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 4,
        borderRadius: 100,
        width: 140,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    currentWeight: {
        color: 'white',
        fontSize: 28,
        fontWeight: '700'
    },
    kgText: {
        color: 'white',
        fontSize: 14,
        alignItems: 'flex-end'
    },
    macrosCont: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'space-between',
        marginTop: 40,
    },
    macrosHeader: {
        color: 'white',
        marginBottom: 5,
        fontWeight: '500',
    },
    macroAmounts: {
        color: 'white',
        marginTop: 5,
        fontWeight: '500'
    },
    mealsHeadersCont: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'space-between',
    },
    todaysMealsText: {
        color: '#A6A6A6',
        fontSize: 14,
        marginLeft: 30
    },
    openCalendarText: {
        color: '#16BCFF',
        fontSize: 14,
        marginRight: 30
    }
})
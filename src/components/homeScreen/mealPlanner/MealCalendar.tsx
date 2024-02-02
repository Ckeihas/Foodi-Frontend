import React from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { MealPlannerParams } from "../../../navigation/MealPlannerStack";
import Calendar from "../../calendar/Calendar";

type CalendarScreenProps = NativeStackScreenProps<MealPlannerParams, 'mealCalendar'>
export default function MealCalendar(): JSX.Element{
    const navigation = useNavigation<NativeStackNavigationProp<CalendarScreenProps>>();
    return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackBtn}>
                <Ionicons name="chevron-back-outline" size={30} color="white" />
            </TouchableOpacity>
            <Calendar />
        </View>
    )
};

const styles = StyleSheet.create({
    goBackBtn: {
        position: 'absolute',
        left: 30,
        top: 50,
        zIndex: 2
    },
})
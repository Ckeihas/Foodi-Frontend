import React, {useEffect} from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle, runOnJS, withSpring } from "react-native-reanimated";

export default function ProgressBar({currentValue, maxValue}: {currentValue: number, maxValue: number}){

    const progress = useSharedValue(0);
 
    useEffect(() => {
        progress.value = withTiming(currentValue / maxValue, {
            duration: 2000 
        })
    }, [])

    const animatedBar = useAnimatedStyle(() => {
        return{
            width: `${progress.value * 100}%`,
            backgroundColor: 'white',
            height: 8,
        }
    })

    return(
        <>
        <View style={styles.progressBarBackground}>
            <Animated.View style={[{backgroundColor: 'white', borderRadius: 10}, animatedBar]}/>
        </View>
        </>     
    )
};

const styles = StyleSheet.create({
    progressBar: {
        height: 20,
        width: '100%',
        borderRadius: 10,
    },
    progressBarBackground: {  
        height: 8,
        width: 100,
        backgroundColor: '#2AAB35',
        borderRadius: 10,
    }
})

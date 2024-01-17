import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { ReText } from "react-native-redash";
import { Svg, Circle } from "react-native-svg";


const { width, height } = Dimensions.get("window")
const CIRCLE_LENGHT = 400;
const R = CIRCLE_LENGHT / (2 * Math.PI);
const BACKGROUND_STROKE_COLOR = '#BDFFAA'

//Circle animnations



export default function ProgressCircle({weight}: {weight: number}){

    const progress = useSharedValue(0);
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCLE_LENGHT * (1 - progress.value)
    }));
    useEffect(() => {
        progress.value = withTiming(1, {
            duration: 2000
        })
    }, [])

    const progressText = useDerivedValue(() => {
        return `${Math.floor(progress.value * weight)}`
    })
    return(
        <View style={[styles.container]}>
            <View style={styles.progressTextCont}>
                <ReText style={styles.progressTextStyle} text={progressText}/>
                <Text style={styles.kgText}>Kg</Text>
            </View>
            
            <Svg height={height} width={width}>
                <Circle 
                cx={width / 2}
                cy={height / 7}          
                r={R}
                stroke={BACKGROUND_STROKE_COLOR}
                strokeWidth={10}
                fill={'#40D94E'}
                />
                <AnimatedCircle               
                cx={width / 2}
                cy={height / 7}          
                r={R}
                stroke={'#80FF5B'}
                strokeWidth={12}
                fill={'#40D94E'}
                strokeDasharray={CIRCLE_LENGHT}
                strokeDashoffset={CIRCLE_LENGHT * 0.5}
                animatedProps={animatedProps}
                strokeLinecap={'round'}
                />
            </Svg>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: R * 3,
        textAlign: 'center'
    },
    progressTextCont: {
        position: 'absolute',
        top: 105,
        zIndex: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    progressTextStyle: {
        color: 'white',
        fontSize: 32,
        fontWeight: '700',   
    },
    kgText: {
        color: 'white',
        fontSize: 14,
        alignItems: 'flex-end'
    }
})
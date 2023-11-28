import { createBottomTabNavigator, BottomTabBarProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, LayoutChangeEvent, Pressable, Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import FeedScreen from "../screens/FeedScreen";
import CreateRecipeScreen from "../screens/CreateRecipeScreen";
import UserPostsScreen from "../screens/UsersPostsScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useReducer, useRef } from "react";
import Animated, { useDerivedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg"



export type BottomTabParamList = {
    home: undefined;
    feed: undefined;
    createRecipe: undefined;
    posts: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors } : BottomTabBarProps) => {
    const { bottom } = useSafeAreaInsets()
  
    // get information about the components position on the screen -----
  
    const reducer = (state: any, action: { x: number, index: number }) => {
      // Add the new value to the state
      return [...state, { x: action.x, index: action.index }]
    }
  
    const [layout, dispatch] = useReducer(reducer, [])
    // console.log(layout)
  
    const handleLayout = (event: LayoutChangeEvent, index: number) => {
      dispatch({ x: event.nativeEvent.layout.x, index })
    }
  
    // animations ------------------------------------------------------
  
    const xOffset = useDerivedValue(() => {
      // Our code hasn't finished rendering yet, so we can't use the layout values
      if (layout.length !== routes.length) return 0;
      return [...layout].find(({ index }) => index === activeIndex)!.x - 25
    }, [activeIndex, layout])
  
    const animatedStyles = useAnimatedStyle(() => {
      return {
        // translateX to the calculated offset with a smooth transition
        transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
      }
    })
  
    return (
      <View style={[styles.tabBar, { paddingBottom: bottom }]}>
        <AnimatedSvg
          width={110}
          height={60}
          viewBox="0 0 110 60"
          style={[styles.activeBackground, animatedStyles]}
        >
          <Path
            fill="white"
            d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
          />
        </AnimatedSvg>
  
        <View style={styles.tabBarContainer}>
          {routes.map((route, index) => {
            const active = index === activeIndex
            const { options } = descriptors[route.key]
  
            return (
              <TabBarComponent
                key={route.key}
                active={active}
                options={options}
                onLayout={(e) => handleLayout(e, index)}
                onPress={() => navigation.navigate(route.name)}
              />
            )
          })}
        </View>
      </View>
    )
  };

  //---------------------------------------------------------------------------------------

  type TabBarComponentProps = {
    active?: boolean
    options: BottomTabNavigationOptions
    onLayout: (e: LayoutChangeEvent) => void
    onPress: () => void
  };

  const TabBarComponent = ({ active, options, onLayout, onPress }: TabBarComponentProps) => {
    // handle lottie animation -----------------------------------------
    const ref = useRef(null)
  
    useEffect(() => {
      if (active && ref?.current) {
        // @ts-ignore
        ref.current.play()
      }
    }, [active])
  
    // animations ------------------------------------------------------
  
    const animatedComponentCircleStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: withTiming(active ? 1 : 0, { duration: 250 })
          }
        ]
      }
    })
  
    const animatedIconContainerStyles = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
      }
    })
  
    return (
      <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
        <Animated.View
          style={[styles.componentCircle, animatedComponentCircleStyles]}
        />
        <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
          {/* @ts-ignore */}
          {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
        </Animated.View>
      </Pressable>
    )
  }
export default function BottomTabNavigation(){
    return(
        <View style={{flex: 1}}>
            <Tab.Navigator 
            tabBar={(props) => <AnimatedTabBar {...props}
            />}
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false
            }}
            >
                <Tab.Screen name="home" component={HomeScreen}/>
                <Tab.Screen name="feed" component={FeedScreen}/>
                <Tab.Screen name="createRecipe" component={CreateRecipeScreen}/>
                <Tab.Screen name="posts" component={UserPostsScreen}/>
            </Tab.Navigator>
        </View>
    )
};

const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: 'white',
    },
    activeBackground: {
      position: 'absolute',
    },
    tabBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    component: {
      height: 60,
      width: 60,
      marginTop: -5,
    },
    componentCircle: {
      flex: 1,
      borderRadius: 30,
      backgroundColor: '#FF6A48',
    },
    iconContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      height: 36,
      width: 36,
    }
  });
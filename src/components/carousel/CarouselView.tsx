import React, {FC, useRef, useState, useCallback, useEffect} from "react";
import { View, Dimensions, Text, TouchableWithoutFeedback, Image, StyleSheet, FlatList, Animated } from "react-native";
import { Data } from "../../dummyData/DummyData";
import { mealsData } from "../../dummyData/DummyData";

interface TestCarouselItem {
    id: number,
    testi?: string,
    image?: number,
};

const testii: TestCarouselItem[] = [
{
    id: 0,
    testi: "MOI",
    image: require("../../../assets/food5.jpg")
},
{
    id: 1,
    testi: "MOI",
    image: require("../../../assets/food5.jpg")
},
{
    id: 2,
    testi: "MOI",
    image: require("../../../assets/food5.jpg")
},
{
    id: 3,
    testi: "MOI",
    image: require("../../../assets/food5.jpg")
},
{
    id: 4,
    testi: "MOI",
    image: require("../../../assets/food5.jpg")
},
{
    id: 5,
    testi: "MOI",
    image: require("../../../assets/food5.jpg")
},
{
    id: 6,
    testi: "MOI",
    image: require("../../../assets/food5.jpg")
},
{
    id: 7,
    testi: "MOI",
    image: require("../../../assets/food5.jpg")
},
{
    id: 8,
    testi: "MOI",
    image: require("../../../assets/food5.jpg")
},
{
    id: 9,
    testi: "MOI",
    image: require("../../../assets/food5.jpg")
},
];

interface CarouselDataProps {
    data: TestCarouselItem[]
};
var { width, height } = Dimensions.get('window');

const SPACING = 5;
const ITEM_LENGTH = width * 0.8 // Item is a square. Therefore, its height and width are of the same length.
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
const BORDER_RADIUS = 20;
const CURRENT_ITEM_TRANSLATE_Y = 48;


export default function CarouselView(): JSX.Element{

    const RenderCarousel: FC<CarouselDataProps> = useCallback(({data}) => {
        const scrollX = useRef(new Animated.Value(0)).current;
        const [dataWithPlaceHolders, setDataWithPlaceholders] = useState<TestCarouselItem[]>([]);
        useEffect(() => {
            setDataWithPlaceholders([{id: -1}, ...data, {id: data.length}]);
        }, [data])
    
        return(
            <View>
                <View style={{marginHorizontal: 30}}>
                    <Text style={styles.flatListHeaderText}>Popular Recipes</Text>
                </View>          
                <FlatList 
                data={dataWithPlaceHolders}
                renderItem={({item, index}) => {
                    if (!item.image || !item.testi) {
                        return <View style={{width: EMPTY_ITEM_LENGTH}} />;
                      }
                    const inputRange = [
                        (index - 2) * ITEM_LENGTH,
                        (index - 1) * ITEM_LENGTH,
                        index * ITEM_LENGTH,
                      ];
                      
                      const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [
                          CURRENT_ITEM_TRANSLATE_Y * 2,
                          CURRENT_ITEM_TRANSLATE_Y,
                          CURRENT_ITEM_TRANSLATE_Y * 2,
                        ],
                        extrapolate: 'clamp',
                      });
                    return(
                        <TouchableWithoutFeedback onPress={() => console.log("Jes")}>
                            <Animated.View style={[{
                                transform: [{translateY}],
                                },styles.recipeCardCont]}>
                                <View style={styles.imgShadow}>
                                    <Image source={require("../../../assets/food5.jpg")} style={styles.recipeCardImg}/>
                                </View>
                                <View style={styles.cardTextHeaderCont}>
                                    <Text style={styles.cardTextHeader}>Recipe Title</Text>
                                </View>
                                <View style={styles.cardTextCont}>
                                    <View>
                                        <Text style={styles.cardText}>20min</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.cardText}>350cla</Text>
                                    </View>
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    )
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                decelerationRate={0}
                renderToHardwareTextureAndroid
                snapToInterval={ITEM_LENGTH}
                snapToAlignment="start"
                onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false},
                )}
                scrollEventThrottle={16}
                contentContainerStyle={styles.flatListContent}
                />
            </View>
        )
    }, []);
    return(
        <View>
            {
                RenderCarousel({data: testii})
            }
        </View>
    )
};


const styles = StyleSheet.create({
    recipeCardCont: {
        backgroundColor: '#FF6A48',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: SPACING * 6,
        marginBottom: 50,
        marginTop: 20,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        width: ITEM_LENGTH * 0.8,
    },
    recipeCardImg: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    imgShadow: {
        top: -50,
        backgroundColor: 'white',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        borderRadius: 100
    },
    cardTextHeaderCont: {
        marginBottom: 10
    },
    cardTextHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    cardTextCont: {
        flexDirection: 'row',
        marginBottom: 20,
        display: 'flex',
    },
    cardText: {
        color: 'white',
    },
    flatListContent: {
        marginBottom: CURRENT_ITEM_TRANSLATE_Y,
        alignItems: 'center',
    },
    flatListHeaderText: {
        fontWeight: 'bold',
        fontSize: 20
    }
})
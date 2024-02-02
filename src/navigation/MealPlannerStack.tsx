import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import MealPlanner from '../components/homeScreen/mealPlanner/MealPlanner';
import MealCalendar from '../components/homeScreen/mealPlanner/MealCalendar';

const options: StackNavigationOptions = {
    headerShown: false,
};

export type MealPlannerParams = {
    overview: undefined
    mealCalendar: undefined
}
const Stack = createStackNavigator<MealPlannerParams>()
export default function MealPlannerStack():JSX.Element{
    return(
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name={"overview"} component={MealPlanner}/>
            <Stack.Screen name={"mealCalendar"} component={MealCalendar}/>
        </Stack.Navigator>
    )
}
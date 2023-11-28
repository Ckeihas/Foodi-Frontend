import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './src/auth/SignUp';
import Navigation from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import Home from './src/screens/Home';
import PressedIconData from './src/components/homeScreen/RecipeCard';
import { Data } from './src/dummyData/DummyData';
import BottomTabNavigation from './src/navigation/BottomTabsNavigation';

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Navigation />
      {/* <BottomTabNavigation /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

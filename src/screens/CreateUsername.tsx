import React, { useId, useState } from "react";
import { View, SafeAreaView, Text, StyleSheet, TextInput, Pressable, TouchableOpacity } from "react-native";
import { AntDesign} from '@expo/vector-icons';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/Navigation";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { GetUserData } from "../api/GetUserData";
import { CheckAccessToken } from "../components/auth/CheckAccessToken";
//Install lodash and set it to textinput

type CreateUsernameProps = NativeStackScreenProps<RootStackParamList, 'createUsername'>
export default function CreateUsername({route}: CreateUsernameProps): JSX.Element{
    const [username, setUsername] = useState<string>();
    const { userId, email, password } = route.params;
    
    async function saveToSecureStorage(key: string, value: string): Promise<void> {
        await SecureStore.setItemAsync(key, value);
      };

    async function saveRefreshToSecureStorage(key: string, value: string): Promise<void> {
        await SecureStore.setItemAsync(key, value);
      };
      
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handlePress = (): void => {
        console.log(username)
        const config = {
            username: username,
            appleId: userId
        }
        axios.post("http://192.168.1.103:3000/signup/apple", {data: config})
        .then(resp => {
            console.log("User info: ", resp.data)
            const accessToken = "AccessToken";
            const refreshToken = "RefreshToken";
            saveToSecureStorage(accessToken, resp.data.accessToken)
            saveRefreshToSecureStorage(refreshToken, resp.data.refreshToken)
            navigation.navigate("home")
        }).catch(err => {
            console.log("Error: ", err)
        }) 
    }

    const handleEmail = (): void => {
        const config = {
            username: username,
            email: email,
            password: password
        }

        axios.post("http://192.168.1.103:3000/signup/email", {data: config}).then(resp => {
            const accessToken = "AccessToken";
            const refreshToken = "RefreshToken";
            console.log("Tokenit: ", resp.data.accessToken)
            axios.defaults.headers.common['Authorization'] = `Bearer ${resp.data.accessToken}`;
            saveToSecureStorage(accessToken, resp.data.accessToken)
            saveRefreshToSecureStorage(refreshToken, resp.data.refreshToken)
            GetUserData();
        }).then(() => {
            navigation.navigate('home')
        })
    }
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Create Username</Text>
                <View style={styles.inputCont}>
                    <AntDesign 
                    name="user" 
                    size={50} 
                    color="#666"
                    style={styles.icon}
                     />
                    <TextInput 
                    placeholder="Username" 
                    style={styles.inputField}
                    onChangeText={setUsername}
                    />
                </View>
            <TouchableOpacity style={styles.btnCont} onPress={handleEmail}>
                <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        position: 'absolute',
        top: 250,
        left: 50,
        fontSize: 30,
        fontWeight: 'bold'
    },
    inputCont: {
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 26,
        width: 300,
    },
    icon: {
        marginRight: 10,
        paddingBottom: 10
    },
    inputField: {
        fontSize: 40,
        color: '#666'
    },
    btnCont: {
        position: 'absolute',
        bottom: 120
    },
    btnText: {
        color: 'orange',
        fontSize: 36,
        fontWeight: 'bold'
    }
})
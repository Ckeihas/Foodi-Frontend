import React, {useState} from "react";
import { SafeAreaView, Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import AppleSignIn from "./apple/AppleSignIn";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";

export default function Login(): JSX.Element {
    const [username, setUsername] = useState<string>("");
    const authNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Login</Text>
            <View>
                <View style={styles.inputCont}>
                    <AntDesign 
                    name="user" 
                    size={20} 
                    color="#666"
                    style={styles.icon}
                     />
                    <TextInput 
                    placeholder="Username" 
                    style={styles.inputField}
                    onChangeText={setUsername}
                    />
                </View>
                <View style={styles.inputCont}>
                    <Feather 
                    name="lock" 
                    size={20} 
                    color="#666"
                    style={styles.icon}
                     />
                    <TextInput placeholder="Password" style={styles.inputField}/>
                </View>
            </View>
            <View>
                <Pressable style={styles.signUpBtn}>
                    <Text style={styles.signUpText}>Login</Text>
                </Pressable>
            </View>
            <View style={styles.dividerCont}>
                <View style={styles.dividerLine} />
                <Text style={styles.orText}>Or</Text>
                <View style={styles.dividerLine}/>
            </View>
            {/* Apple and Google buttons */}
            <AppleSignIn />
            {/* <GoogleSignUp /> */}
                   
            <View style={styles.bottomTextCont}>
                <Text style={{color: 'gray'}}>Don't have an account yet?</Text>
                <Pressable onPress={() => authNav.navigate('signup')}>
                    <Text style={styles.signInText}>Sign Up</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
        paddingBottom: 10
    },
    inputField: {
        paddingBottom: 10,
        marginRight: 20
    },
    inputCont: {
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 36,
        width: 300,
    },
    headerText: {
        position: 'absolute',
        top: 130,
        left: 50,
        fontSize: 30,
        fontWeight: 'bold'
    },
    signUpBtn: {
        backgroundColor: 'orange',
        borderRadius: 30,
        width: 150,
        alignItems: 'center'
    },
    signUpText: {
        padding: 15,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    dividerCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30
    },
    dividerLine: {
        borderWidth: 0.6,
        borderColor: '#ccc',
        width: 150,
        height: 0
    },
    orText: {
        marginHorizontal: 10
    },
    bottomTextCont: {
        flexDirection: 'row',
        marginTop: 50
    },
    signInText: {
        fontWeight: 'bold',
        color: 'orange',
        marginLeft: 8
    }
});
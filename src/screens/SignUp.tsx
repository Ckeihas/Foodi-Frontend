import React from "react";
import { SafeAreaView, Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import AppleSignUp from "./apple/AppleSignUp";
import GoogleSignUp from "./google/GoogleSignUp";

export default function SignUp(): JSX.Element{
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Create Account</Text>
            <View>
                <View style={styles.inputCont}>
                    <AntDesign 
                    name="user" 
                    size={20} 
                    color="#666"
                    style={styles.icon}
                     />
                    <TextInput placeholder="Username" style={styles.inputField}/>
                </View>
                <View style={styles.inputCont}>
                    <MaterialIcons 
                    name="alternate-email" 
                    size={20} 
                    color="#666"
                    style={styles.icon}
                     />
                    <TextInput placeholder="Email" style={styles.inputField}/>
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
                <View style={styles.inputCont}>
                    <Feather 
                    name="lock" 
                    size={20} 
                    color="#666"
                    style={styles.icon}
                     />
                    <TextInput placeholder="Confirm Password" style={styles.inputField}/>
                </View>
            </View>
            <View>
                <Pressable style={styles.signUpBtn}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                </Pressable>
            </View>
            <View style={styles.dividerCont}>
                <View style={styles.dividerLine} />
                <Text style={styles.orText}>Or</Text>
                <View style={styles.dividerLine}/>
            </View>
            {/* Apple and Google buttons */}
            <AppleSignUp />
            {/* <GoogleSignUp /> */}
            
            <View style={styles.bottomTextCont}>
                <Text style={{color: 'gray'}}>Already have an account?</Text>
                <Pressable>
                    <Text style={styles.signInText}>Sign In</Text>
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
        marginBottom: 26,
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
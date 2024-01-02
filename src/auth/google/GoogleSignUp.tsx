import { View, StyleSheet, Button } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { signInAsync } from 'expo-apple-authentication';
import { webClientId, iosClientId } from '@env';



export default function GoogleSignUp(): JSX.Element{

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    offlineAccess: true,
    webClientId: webClientId,
    iosClientId: iosClientId
  });
 

    // if(response?.type === "success"){

    // }
    // console.log("Google response: ", response)

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
      };
    return(
        <View style={styles.googleBtn}>
            <Button title='Google sign up' onPress={() => signIn()}/>
            <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => signIn()}         
          />
        </View>
    )
};

const styles = StyleSheet.create({
  googleBtn: {
    width: 250,
    height: 50,
    borderRadius: 20,
  }
})
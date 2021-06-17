import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            const oldUser = await auth().signInWithEmailAndPassword(email, password);
            firestore()
              .collection('Users')
              .doc(oldUser.user.uid)
              .update({
                Password: password,
              })
              .then(() => console.log('Data user set'))
              .catch(e => console.log(e));
          } catch (e) {
            console.log(e);
            if (e.code === 'auth/invalid-email') {
              Alert.alert('INVALID', 'Your email do not exist!', [
                {
                  text: 'Understood',
                  onPress: () => console.log('email alert close'),
                },
              ]);
            }
            if (e.code === 'auth/wrong-password') {
              Alert.alert('OOPS!', 'Wrong password', [
                {
                  text: 'Understood',
                  onPress: () => console.log('password alert close'),
                },
              ]);
            }
            if (e.code === 'auth/user-not-found') {
              Alert.alert('OOPS!', 'User not found', [
                {
                  text: 'Understood',
                  onPress: () => console.log('user alert close'),
                },
              ]);
            }
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
          } catch (e) {
            console.log(e);
          }
        },
        facebookLogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            // Sign-in the user with the credential
            const newFbUser = await auth().signInWithCredential(
              facebookCredential,
            );
            console.log('newFbUser', newFbUser);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, displayName, phoneNumber) => {
          try {
            const newUser = await auth().createUserWithEmailAndPassword(
              email,
              password,
              displayName,
              phoneNumber,
            );
            console.log('newUser', newUser);
            firestore()
              .collection('Users')
              .doc(newUser.user.uid)
              .set({
                Name: displayName,
                Email: email,
                Password: password,
                Phone: phoneNumber,
                Avatar: null,
                Bio: null,
              })
              .then(() => console.log('Data user set'))
              .catch(e => console.log(e));
          } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
              Alert.alert('INVALID', 'That email address is already in use!', [
                {
                  text: 'Understood',
                  onPress: () => console.log('email register alert close'),
                },
              ]);
            }

            if (e.code === 'auth/invalid-email') {
              Alert.alert('INVALID', 'That email address is invalid!', [
                {
                  text: 'Understood',
                  onPress: () => console.log('email register alert close'),
                },
              ]);
            }
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        reset: async email => {
          try {
            await auth()
              .sendPasswordResetEmail(email)
              .then(() => {
                Alert.alert(
                  'Reset password!',
                  'Your password has been sent to your email',
                ),
                  [
                    {
                      text: 'Understood',
                      onPress: () => console.log('reset password alert close'),
                    },
                  ];
              });
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

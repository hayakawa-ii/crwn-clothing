import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDrtUbbgXQP97gOsXSAworlPlPZYbiCn8E",
    authDomain: "crown-db-65a54.firebaseapp.com",
    databaseURL: "https://crown-db-65a54.firebaseio.com",
    projectId: "crown-db-65a54",
    storageBucket: "crown-db-65a54.appspot.com",
    messagingSenderId: "565069227250",
    appId: "1:565069227250:web:fe8a3963541232a4791c6b",
    measurementId: "G-VYCLY20XXV"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;
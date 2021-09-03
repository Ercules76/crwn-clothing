import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAy-hXu78hMR3ZbUULpa7mTutjGX4xtDQE",
    authDomain: "crwn-db-ffe48.firebaseapp.com",
    projectId: "crwn-db-ffe48",
    storageBucket: "crwn-db-ffe48.appspot.com",
    messagingSenderId: "1071754561186",
    appId: "1:1071754561186:web:e11ecbee878beb15c7f9fb"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`/user/${userAuth.uid}`);
    const snapshot =  await userRef.get();    

    if(!snapshot.exists) {
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
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
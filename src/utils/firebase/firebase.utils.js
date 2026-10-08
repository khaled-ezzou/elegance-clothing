import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {  getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCf77JUcb1DtF4DkRNshbLosGnCLNfhr_Y",
    authDomain: "elegance-clothing-db.firebaseapp.com",
    projectId: "elegance-clothing-db",
    storageBucket: "elegance-clothing-db.firebasestorage.app",
    messagingSenderId: "939167040790",
    appId: "1:939167040790:web:d4aeaac1a5dad463fe7c37"
};

const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userDocRef;
}
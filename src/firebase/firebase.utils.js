import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDKDYadD3m3EsXGbhNcwhjWkqkwVYPuz38",
  authDomain: "small-ecomerce-db.firebaseapp.com",
  databaseURL: "https://small-ecomerce-db.firebaseio.com",
  projectId: "small-ecomerce-db",
  storageBucket: "small-ecomerce-db.appspot.com",
  messagingSenderId: "905153141099",
  appId: "1:905153141099:web:4e5f9b975d6e0140df142e"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  
  if(!snapShot.exists) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({displayName, email, createdAt, ...additionalData})
    } catch (error) {
      console.log('Error: error while creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

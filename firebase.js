import firebase from "firebase";



const firebaseConfig = {
    
    apiKey: "AIzaSyAf8Hhjf7m8ynNwuXHXL5eKyb7IFeTAaxA",
    authDomain: "tiles-79f37.firebaseapp.com",
    projectId: "tiles-79f37",
    storageBucket: "tiles-79f37.appspot.com",
    messagingSenderId: "764262459289",
    appId: "1:764262459289:web:bbf4295d586bddca72d508",
    measurementId: "G-ZJ7X09WMX0"
  
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth =firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  //export default firebase;
   export {db , auth , provider , storage};
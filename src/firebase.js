import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDUVJ_N-LRdRPyxWdM3qr1tq5E6WS3Rg-0",
    authDomain: "greenchariot-982eb.firebaseapp.com",
    projectId: "greenchariot-982eb",
    storageBucket: "greenchariot-982eb.appspot.com",
    messagingSenderId: "512070820585",
    appId: "1:512070820585:web:bc3646efe3b672eeba8678",
    measurementId: "G-Z9ZNG02QKV"
  };

firebase.initializeApp(firebaseConfig);
//var database = firebase.firestore();
export default firebase;
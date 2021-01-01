import firebase from "firebase";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBnH8xuYD2BLbr87jDWy6RwP3oDq8d5-SQ",
    authDomain: "tasklist-54a1a.firebaseapp.com",
    projectId: "tasklist-54a1a",
    storageBucket: "tasklist-54a1a.appspot.com",
    messagingSenderId: "50634212071",
    appId: "1:50634212071:web:9c4d4a3a23a56425b89842",
    measurementId: "G-F3KQ8DPRDQ"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
// firebase.analytics();
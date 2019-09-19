import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyD1U8xIqzlBexj3Hl_aQ-DWshi3eB4Qxjw",
    authDomain: "askjob007.firebaseapp.com",
    databaseURL: "https://askjob007.firebaseio.com",
    projectId: "askjob007",
    storageBucket: "",
    messagingSenderId: "914495445026",
    appId: "1:914495445026:web:115a2ee854705de05b127b"
  };
  firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();
export const storage=firebase.storage();
export const db=firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();
export const fire = firebase;
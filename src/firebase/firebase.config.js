const { initializeApp, getApps } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyB4uhFM9BzP1ww-I36w1CVKDW-2P5KUa60",
    authDomain: "goaave-755a2.firebaseapp.com",
    projectId: "goaave-755a2",
    storageBucket: "goaave-755a2.appspot.com",
    messagingSenderId: "15933041933",
    appId: "1:15933041933:web:3eff9d3fdc23b2dfe5d444"
  };

let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
let db = getFirestore(firebaseApp);

module.exports = { firebaseApp, db};
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBVUjS60WQv_o5sFThu903Cm2IIrKMrK_Y",
    authDomain: "miniblog-decc5.firebaseapp.com",
    projectId: "miniblog-decc5",
    storageBucket: "miniblog-decc5.appspot.com",
    messagingSenderId: "445181602925",
    appId: "1:445181602925:web:fe58801f7d6c1aaf5b2364"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
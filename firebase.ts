import {getApps, getApp, initializeApp} from "@firebase/app";
import {getFirestore} from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAITVAKUG_i0gmJ0yck0VBZM9gStr0_VRc",
    authDomain: "aichatbot-28855.firebaseapp.com",
    projectId: "aichatbot-28855",
    storageBucket: "aichatbot-28855.appspot.com",
    messagingSenderId: "760014253451",
    appId: "1:760014253451:web:dbd386553596e95f8cd38e"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export {db};
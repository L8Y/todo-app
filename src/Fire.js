import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyH_TTlYn0Y6m5R8lcK5mzJwclnhvLLDM",
    authDomain: "newtodo-2a27a.firebaseapp.com",
    projectId: "newtodo-2a27a",
    storageBucket: "newtodo-2a27a.appspot.com",
    messagingSenderId: "41132048598",
    appId: "1:41132048598:web:bdb17d04e79cd2b230c977"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "apptube-6b90c.firebaseapp.com",
  projectId: "apptube-6b90c",
  storageBucket: "apptube-6b90c.appspot.com",
  messagingSenderId: "673230056702",
  appId: "1:673230056702:web:0f2a69ea375d068dc189af",
  measurementId: "G-1S09BPW21Y",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

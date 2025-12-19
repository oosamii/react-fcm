import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCwUKNY8I03LVghUKwemEhlS2WeDd7S1-g",
  authDomain: "salmara-f75c3.firebaseapp.com",
  projectId: "salmara-f75c3",
  storageBucket: "salmara-f75c3.firebasestorage.app",
  messagingSenderId: "981347013176",
  appId: "1:981347013176:web:ffa314e9dfd80ff5d4cccd",
  measurementId: "G-H3B071BLT3",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

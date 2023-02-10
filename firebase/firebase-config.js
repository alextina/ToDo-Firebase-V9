import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDajWCMjr6DDaSj1bcTp9F0FUoRxaD5nMs",
  authDomain: "to-do-app-2023.firebaseapp.com",
  projectId: "to-do-app-2023",
  storageBucket: "to-do-app-2023.appspot.com",
  messagingSenderId: "441992196853",
  appId: "1:441992196853:web:652dc0b500e9ae7e330bbc"
};

export const app = initializeApp(firebaseConfig);
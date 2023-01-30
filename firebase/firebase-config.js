import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyACR5GlE8nsVqNvUcZuGb1p0lFrfE0KIOQ",
  authDomain: "todo-2fce1.firebaseapp.com",
  projectId: "todo-2fce1",
  storageBucket: "todo-2fce1.appspot.com",
  messagingSenderId: "462447536196",
  appId: "1:462447536196:web:f507ede408a199a5a9b411"
};

export const app = initializeApp(firebaseConfig);
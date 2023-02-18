import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth"
import { app as firebase } from "./firebase-config"; // tambien puede ser -> import { app } from "./firebase-config.js" y se reemplaza app por firebase

export const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();
auth.languageCode = "es";

export function signInWithGoogle() {
    return signInWithPopup(auth, provider);
}

export function sigUpWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
} 

export function emailVerification() {
    return sendEmailVerification(auth.currentUser);
}

export function logOut() {
    return signOut(auth);
}
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { app } from "./firebase-config.js"

const auth = getAuth(app);
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

export function logOut() {
    return signOut(auth);
}
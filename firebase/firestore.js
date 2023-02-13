import { getAuth } from "firebase/auth";
import { addDoc,
    collection,
    getDocs,
    getFirestore,
    onSnapshot,
    serverTimestamp } from "firebase/firestore"
import { app as firebase } from "./firebase-config";

const auth = getAuth(firebase);
const db = getFirestore(firebase);


export function saveTask (task) {
    const user = auth.currentUser;
    addDoc(collection(db, "tasks"), {
        task,
        userUid: user.uid,
        userEmail: user.email,
        date: serverTimestamp(),
    });
};

export function getTasks () {
    return getDocs(collection(db, "tasks"))
};

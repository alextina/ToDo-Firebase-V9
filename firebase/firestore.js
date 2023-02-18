import { addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    updateDoc} from "firebase/firestore"
import { auth } from "./auth";
import { app as firebase } from "./firebase-config";

const db = getFirestore(firebase);


export function saveTask (task) {
    const user = auth.currentUser;
    addDoc(collection(db, "tasks"), {
        task,
        userUid: user.uid,
        userEmail: user.email,
        date: new Date(),
    });
};

export function onGetTaks (callback) {
    return onSnapshot(q, callback);
}

export function deleteTask (id) {
    return deleteDoc(doc(db, "tasks", id));
}

export function getTask (id) {
    return getDoc(doc(db, "tasks", id));
}

export function updateTask (id, newField) {
    return updateDoc(doc(db, "tasks", id), newField);
}

export const q = query(collection(db, "tasks"), orderBy('date', 'desc'));
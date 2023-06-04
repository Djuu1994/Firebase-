import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDHknrAOGEtSz4eU6mioFYRbOi7jhNHzwI",
    authDomain: "todo-list-caspar.firebaseapp.com",
    projectId: "todo-list-caspar",
    storageBucket: "todo-list-caspar.appspot.com",
    messagingSenderId: "636917053941",
    appId: "1:636917053941:web:b821ae75c370b8528a88bc"
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db
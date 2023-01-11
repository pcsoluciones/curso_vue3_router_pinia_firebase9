import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite";


const firebaseConfig = {
  apiKey: "AIzaSyBT0Ve0uqpJPrwnD6EESJK5YcoyDNSbT4Q",
  authDomain: "vue3-2023.firebaseapp.com",
  projectId: "vue3-2023",
  storageBucket: "vue3-2023.appspot.com",
  messagingSenderId: "779835371856",
  appId: "1:779835371856:web:e2067d414dd4de3baf7c55"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
export { auth, db };


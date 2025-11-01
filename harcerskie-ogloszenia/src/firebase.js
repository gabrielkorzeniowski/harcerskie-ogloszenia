// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4V0A3s9iu5m-Nn2VCVofhROPgwIsnp5w",
  authDomain: "bazarodziceszyszki.firebaseapp.com",
  projectId: "bazarodziceszyszki",
  storageBucket: "bazarodziceszyszki.firebasestorage.app",
  messagingSenderId: "322423903411",
  appId: "1:322423903411:web:9de6d30ee185ae5ab30cc6",
  measurementId: "G-WX9SPFT39V"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Eksport baz danych i storage, aby używać ich w całym projekcie
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

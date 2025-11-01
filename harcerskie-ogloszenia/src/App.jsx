import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import ListingCard from "./components/ListingCard";
import AddListingForm from "./components/AddListingForm";
import AdminPanel from "./components/AdminPanel";
import Navbar from "./components/Navbar";

export default function App() {
  const [listings, setListings] = useState([]);
  const [adminMode, setAdminMode] = useState(false);

  // 🔄 Pobieranie danych w czasie rzeczywistym
  useEffect(() => {
    const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setListings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 🧹 Usuwanie ogłoszenia (tylko dla admina)
  const handleDelete = async (id) => {
    if (!adminMode) return alert("Tylko administrator może usuwać ogłoszenia.");
    await deleteDoc(doc(db, "listings", id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      <Navbar onAdminToggle={setAdminMode} adminMode={adminMode} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.h1
          className="text-3xl font-bold text-center text-blue-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🏕️ Bazar Rodziców Harcerskich
        </motion.h1>

        <AddListingForm />

        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          {listings.map((item) => (
            <ListingCard
              key={item.id}
              listing={item}
              onDelete={() => handleDelete(item.id)}
              adminMode={adminMode}
            />
          ))}
        </section>

        {adminMode && <AdminPanel />}
      </main>
    </div>
  );
}

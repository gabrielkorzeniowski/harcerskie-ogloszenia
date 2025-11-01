import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddListingForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    contact: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, image: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "/twierdza.jpg";
      if (formData.image) {
        const imageRef = ref(storage, `images/${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "listings"), {
        ...formData,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Ogłoszenie dodane!");
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        contact: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert("Błąd podczas dodawania ogłoszenia.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-4 space-y-3"
    >
      <h2 className="text-xl font-semibold text-blue-900">Dodaj ogłoszenie</h2>
      <input name="title" placeholder="Tytuł" value={formData.title} onChange={handleChange} required className="w-full border p-2 rounded" />
      <textarea name="description" placeholder="Opis" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="price" placeholder="Cena" value={formData.price} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="category" placeholder="Kategoria" value={formData.category} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="contact" placeholder="Email lub telefon" value={formData.contact} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input type="file" accept="image/*" onChange={handleChange} />
      <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-all">
        Dodaj
      </button>
    </form>
  );
}

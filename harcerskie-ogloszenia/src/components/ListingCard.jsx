import { motion } from "framer-motion";

export default function ListingCard({ listing, onDelete, adminMode }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={listing.imageUrl || "/twierdza.jpg"}
        alt={listing.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-blue-900 mb-1">{listing.title}</h3>
        <p className="text-sm flex-1">{listing.description}</p>
        <p className="font-semibold mt-2">Cena: {listing.price} zł</p>
        <p className="text-sm text-gray-600">Kontakt: {listing.contact}</p>

        {adminMode && (
          <button
            onClick={onDelete}
            className="mt-3 bg-red-500 text-white rounded py-1 hover:bg-red-600"
          >
            Usuń
          </button>
        )}
      </div>
    </motion.div>
  );
}

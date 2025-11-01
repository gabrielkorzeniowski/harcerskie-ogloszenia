import { useState } from "react";

export default function Navbar({ onAdminToggle, adminMode }) {
  const [password, setPassword] = useState("");

  const checkPassword = () => {
    if (password === "admin123") {
      onAdminToggle(true);
      alert("Zalogowano jako administrator");
    } else {
      alert("Nieprawidłowe hasło");
    }
    setPassword("");
  };

  return (
    <nav className="bg-blue-900 text-white py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
        <h2 className="text-xl font-semibold">Bazar Harcerski</h2>

        {!adminMode && (
          <div className="flex items-center gap-2">
            <input
              type="password"
              placeholder="Hasło admina"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded p-1 text-black"
            />
            <button
              onClick={checkPassword}
              className="bg-white text-blue-900 px-2 py-1 rounded hover:bg-slate-200"
            >
              Zaloguj
            </button>
          </div>
        )}

        {adminMode && (
          <button
            onClick={() => onAdminToggle(false)}
            className="bg-white text-blue-900 px-2 py-1 rounded hover:bg-slate-200"
          >
            Wyloguj
          </button>
        )}
      </div>
    </nav>
  );
}

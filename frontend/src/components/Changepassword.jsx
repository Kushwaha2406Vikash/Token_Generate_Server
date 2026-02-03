import { useState } from "react";
import api from "../apihandler";
import { getApiError } from "../utils/errorHandler";

function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setMsg("");
    setError("");

    try {
      const res = await api.post("/reset-password", {
        email,
        new_password: newPassword,
      });

      setMsg(res.data.message);
      setEmail("");
      setNewPassword("");

      setTimeout(() => onClose?.(), 2000);
    } catch (err) {
      setError(getApiError(err));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md p-6 bg-cyan-300 rounded-lg shadow">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Registered Email"
          className="w-full mb-3 px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
        >
          Reset Password
        </button>

        {msg && <p className="text-green-700 text-sm mt-3 text-center">{msg}</p>}
        {error && <p className="text-red-700 text-sm mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;

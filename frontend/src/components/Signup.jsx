import React, { useState } from "react";
import api from "../apihandler";
import { getApiError } from "../utils/errorHandler";
import ForgotPassword from "./Changepassword";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSignup = async () => {
    setMsg("");
    setError("");

    try {
      const res = await api.post("/signup", { email, password });
      setMsg(res.data.status);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(getApiError(err));
    }
  };

  return (
    <>
      <div className="flex justify-center items-center pt-14">
        <div className="max-w-md p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Account
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 px-4 py-2.5 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2.5 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="w-full !bg-pink-600 py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>

          {msg && <p className="text-green-600 text-sm mt-3">{msg}</p>}
          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

          <div className="text-right mt-4">
            <button
              onClick={() => setShowForgotModal(true)}
              className="text-sm text-blue-600 hover:underline !bg-gray-300"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>

      {showForgotModal && (
        <ForgotPassword onClose={() => setShowForgotModal(false)} />
      )}
    </>
  );
}

export default Signup;

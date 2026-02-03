import React, { useState } from "react";
import api from "../apihandler";

function GenerateSecretKey() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setError("");
    setApiKey("");
    setCopied(false);
    setLoading(true);

  try {
  const res = await api.post("/login", {
    email,
    password,
  });

  // Axios automatically parses JSON
  const data = res.data;

  setApiKey(data.api_key);
} catch (err) {
  // Axios error handling
  if (err.response) {
    // Server responded with error status
    setError(err.response.data?.detail || "Login failed");
  } else if (err.request) {
    // Request made but no response (network / CORS)
    setError("Unable to connect to server");
  } else {
    // Something else
    setError(err.message);
  }
} finally {
  setLoading(false);
}


  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg  ">
      <h2 className="text-xl font-semibold text-black mb-4 text-center">
        Generate Secret API Key
      </h2>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full !bg-pink-600 text-black py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Generating..." : "Generate Secret Key"}
      </button>

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
      )}

      {/* API Key Display */}
      {apiKey && (
        <div className="mt-6 bg-gray-200 p-4 rounded relative">
          <p className="text-lg text-blue-600 mb-2 font-medium">
             Copy this key now. You won’t see it again.
          </p>

          <div className="flex items-center justify-between gap-2 ">
            <code className="text-sm break-all text-red-800 font-bold">
              {apiKey}
            </code>

            <button
              onClick={handleCopy}
              className="ml-2 text-lg  !bg-blue-800"
              title="Copy API Key"
            >
              {copied ? "✅" : "📋"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateSecretKey;

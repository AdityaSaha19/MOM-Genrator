"use client";

import { useState } from "react";
import axios from "../../utils/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";

    } catch (err) {
      setError("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4">
      
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            🤖 MOMify AI
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Login to continue
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={login} className="space-y-5">

          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

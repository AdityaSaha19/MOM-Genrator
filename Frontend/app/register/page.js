"use client";

import { useState } from "react";
import axios from "../../utils/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await axios.post("/auth/register", { email, password });
    alert("Registered successfully!");
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-500 to-blue-600">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}

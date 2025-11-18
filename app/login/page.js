"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful");
        router.replace("/");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-black text-gray-100">
      <div className="w-[380px] bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-white tracking-wide">Welcome Back</h1>
        <p className="text-center text-sm text-gray-400 mb-8">Log in to access your account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-gray-900 border border-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full bg-gray-900 border border-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-md text-white font-semibold"
          >
            Log In
          </button>

          {message && (
            <p
              className={`text-center text-sm ${
                message.includes("successful") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

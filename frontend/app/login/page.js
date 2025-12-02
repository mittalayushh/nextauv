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
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("username", data.user.username);

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
    <div className="min-h-screen flex bg-black">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black relative">
        <div className="w-full max-w-md z-10">
          <div className="mb-10">
            <Link href="/" className="inline-block mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-white font-bold text-xl">AUV Forum</span>
              </div>
            </Link>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-3">Welcome back</h1>
            <p className="text-gray-400">Please enter your details.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
              <input
                type="email"
                className="w-full bg-gray-900 border border-gray-800 text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-gray-600"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                className="w-full bg-gray-900 border border-gray-800 text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-gray-600"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">Remember for 30 days</label>
              </div>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white hover:bg-gray-100 text-black font-bold rounded-lg transition-all"
            >
              Sign In
            </button>

            {message && (
              <div className={`p-3 rounded-lg text-sm text-center font-medium ${message.includes("successful") ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                {message}
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-white font-semibold hover:underline transition">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
        <img
          src="/auv-bg.png"
          alt="Autonomous Underwater Vehicle"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-16 z-20 w-full">
          <blockquote className="text-2xl font-medium text-white mb-4">
            "The ocean is the lifeblood of our planet, and AUVs are the key to understanding its pulse."
          </blockquote>
          <p className="text-gray-400 font-medium">
            — Dr. Sylvia Earle, Marine Biologist
          </p>
        </div>
      </div>
    </div>
  );
}

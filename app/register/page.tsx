"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const errData = await res.json();
      setError(errData.message || "Registration failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 border border-gray-100 shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-black tracking-tighter text-black">REGISTER</h2>
          <p className="mt-2 text-sm text-gray-500">Join our premium community</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <input
                type="text"
                required
                className="relative block w-full border-b-2 border-gray-200 px-0 py-3 text-black placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                placeholder="Full Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div>
              <input
                type="email"
                required
                className="relative block w-full border-b-2 border-gray-200 px-0 py-3 text-black placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                placeholder="Email address"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="relative block w-full border-b-2 border-gray-200 px-0 py-3 text-black placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600 font-bold">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center bg-black py-4 px-4 text-sm font-bold tracking-widest text-white hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>
        <div className="flex flex-col items-center space-y-4 pt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-black border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

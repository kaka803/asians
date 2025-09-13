"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    // hardcoded credentials (abhi ke liye)
    const validEmail = "ah0540232@gmail.com";
    const validPassword = "123";

    if (email === validEmail && password === validPassword) {
      localStorage.setItem("auth", "true"); // save login status
      router.push("/dashboard"); // redirect to dashboard
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center  text-white">
      <form
        onSubmit={handleLogin}
        className="white-border p-6 rounded-xl shadow-lg w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">Login</h2>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="white-border py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

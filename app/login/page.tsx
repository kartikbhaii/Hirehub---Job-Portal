'use client';

import { Mail, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      toast.success("Login successful!");

      router.push(
        data.role === "student"
          ? "/student/dashboard"
          : "/recruiter/dashboard"
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center bg-[#EFF5F9]">
      <div className="mt-5 w-120 h-125 bg-white rounded-xl shadow-[0_0_10px_1px_rgba(0,0,0,0.2)]">
        <form onSubmit={handleLogin} className="flex flex-col">
          <h1 className="text-4xl font-bold text-center mt-10">
            Welcome
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Sign in to your HireHub account
          </p>

          <label className="ml-10 mt-6 mb-2 font-semibold">
            Email
          </label>
          <div className="flex items-center gap-3 rounded-md border border-gray-300 w-[80%] ml-10 h-10 text-gray-800">
            <Mail size={20} className="text-gray-500 ml-2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="You@example.com"
              className="w-[90%] h-10 outline-none"
            />
          </div>

          <label className="ml-10 mt-6 mb-2 font-semibold">
            Password
          </label>
          <div className="flex items-center gap-3 rounded-md border border-gray-300 w-[80%] ml-10 h-10 text-gray-800">
            <LockKeyhole size={20} className="text-gray-500 ml-2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-[90%] h-10 outline-none"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-5 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-[80%] h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-md"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
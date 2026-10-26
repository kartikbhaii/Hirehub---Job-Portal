"use client";

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Role = "student" | "recruiter";

export default function OnboardingPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    if (!role || loading) return;

    setLoading(true);

    try {
      const { data } = await axios.post<{ success: boolean; role: string }>(
        "/api/user/sync",
        { role },
      );

      if (data.role !== "student" && data.role !== "recruiter") {
        toast.error("Could not confirm the saved role. Please try again.");
        return;
      }

      toast.success("Role saved!");

      router.replace(
        data.role === "student" ? "/student/dashboard" : "/recruiter/dashboard",
      );
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        toast.error(
          error.response?.data?.message || "Failed to save role. Please try again.",
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[#EFF5F9] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Hire<span className="text-[#0647ae]">Hub</span>
          </h1>
          <p className="text-xl text-gray-600">
            To get the most out of your experience, please tell us a bit about
            yourself.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`border-2 rounded-lg p-6 transition-colors bg-gray-50 cursor-pointer ${
              role === "student"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-600 hover:bg-blue-50"
            }`}
          >
            <div className="flex items-center justify-center mb-8">
              <Image
                src="/student.png"
                alt="student"
                width={100}
                height={100}
              />
            </div>
            <h2 className="text-2xl font-semibold">
              I&apos;m looking for a job
            </h2>
            <p className="text-gray-500 mt-2">
              Find jobs that match your skills and interests
            </p>
          </button>

          <button
            type="button"
            onClick={() => setRole("recruiter")}
            className={`border-2 rounded-lg p-6 transition-colors bg-gray-50 cursor-pointer ${
              role === "recruiter"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-600 hover:bg-blue-50"
            }`}
          >
            <div className="flex items-center justify-center mb-8">
              <Image
                src="/recruiter.png"
                alt="recruiter"
                width={100}
                height={100}
              />
            </div>
            <h2 className="text-2xl font-semibold">I&apos;m hiring talent</h2>
            <p className="text-gray-500 mt-2">
              Find the best talent for your company
            </p>
          </button>
        </div>

        <div className="text-center mt-8">
          <button
            type="button"
            disabled={!role || loading}
            onClick={handleContinue}
            className="bg-[#0647ae] text-white px-10 py-3 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </main>
  );
}

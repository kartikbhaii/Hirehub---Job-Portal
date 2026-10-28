"use client";

import axios from "axios";
import { BriefcaseBusiness } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const job = {
            title: formData.get("title"),
            company: formData.get("company"),
            location: formData.get("location"),
            salary: formData.get("salary"),
            description: formData.get("description"),
            requirements: String(formData.get("requirements"))
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
        }

        try {
            const { data } = await axios.post("/api/jobs", job);
            toast.success("Job posted successfully!");
            router.push("/dashboard/recruiter");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to post job");
        }
    }

    return (
        <main className="bg-[#EFF5F9] w-screen min-h-screen py-6">
            <div className="bg-white w-[50%] mx-auto rounded-lg shadow-lg">
                <div className="w-[90%] mx-auto">
                    <div className="pt-3 flex gap-2 items-center rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                            <BriefcaseBusiness size={30} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold">Post a Job</h1>
                            <p className="text-sm text-gray-400">
                                Fill in the details below to create your job listing
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label className="mt-6 mb-2 font-semibold">Job Title</label>
                        <div className="flex items-center rounded-md border border-gray-300 w-full h-10 text-slate-700">
                            <input
                                name="title"
                                type="text"
                                required
                                placeholder="e.g Full Stack Developer"
                                className="ml-2 w-[90%] h-10 outline-none"
                            />
                        </div>

                        <label className="mt-6 mb-2 font-semibold">Company Name</label>
                        <div className="flex items-center rounded-md border border-gray-300 w-full h-10 text-slate-700">
                            <input
                                name="company"
                                type="text"
                                required
                                placeholder="e.g Google"
                                className="ml-2 w-[90%] h-10 outline-none"
                            />
                        </div>

                        <label className="mt-6 mb-2 font-semibold">Location</label>
                        <div className="flex items-center rounded-md border border-gray-300 w-full h-10 text-slate-700">
                            <input
                                name="location"
                                type="text"
                                required
                                placeholder="e.g Bengaluru"
                                className="ml-2 w-[90%] h-10 outline-none"
                            />
                        </div>

                        <label className="mt-6 mb-2 font-semibold">Salary</label>
                        <div className="flex items-center rounded-md border border-gray-300 w-full h-10 text-slate-700">
                            <input
                                name="salary"
                                type="text"
                                required
                                placeholder="e.g ₹40000 - ₹60000"
                                className="ml-2 w-[90%] h-10 outline-none"
                            />
                        </div>

                        <label className="mt-6 mb-2 font-semibold">Job Description</label>
                        <div className="flex items-center rounded-md border border-gray-300 w-full h-10 text-slate-700">
                            <input
                                name="description"
                                type="text"
                                required
                                placeholder="Describe something about the role..."
                                className="ml-2 w-[90%] h-10 outline-none"
                            />
                        </div>

                        <label className="mt-6 mb-2 font-semibold">Requirement</label>
                        <div className="flex items-center rounded-md border border-gray-300 w-full h-10 text-slate-700">
                            <input
                                name="requirements"
                                type="text"
                                required
                                placeholder="e.g Javascript, React, Nextjs..."
                                className="ml-2 w-[90%] h-10 outline-none"
                            />
                        </div>

                        <div className="flex items-center justify-center mt-8 mb-6">
                            <button
                                type="submit"
                                className="cursor-pointer w-[80%] h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                            >
                                Post Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

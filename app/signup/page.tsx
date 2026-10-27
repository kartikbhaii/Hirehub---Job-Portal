'use client'

import { Mail, LockKeyhole, User, GraduationCap, BriefcaseBusiness } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from "react-hot-toast";

const signupPage = () => {

    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'recruiter' | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!role) {
        toast.error("Please select a role");
        return;
    }

    setLoading(true);

    try {
        await axios.post("/api/auth/signup", {
            name,
            email,
            password,
            role,
        });

        toast.success("Account created successfully!");
        setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
        toast.error(
            "Signup failed: " +
            (error.response?.data?.message || error.message)
        );
    } finally {
        setLoading(false);
    }
}


    return (
        <div className='w-screen h-screen flex justify-center bg-[#EFF5F9]'>
            <div className='mt-5 bg-white w-120 h-[80%] gap-5 rounded-xl shadow-[0_0_10px_1px_rgba(0,0,0,0.2)]'>
                <form onSubmit={handleSignup} className='flex flex-col'>
                    <h1 className='text-4xl font-bold text-center mt-6'>Create your account</h1>
                    <p className='text-gray-600 text-center mt-2'>Join HireHub and find your next opportunity</p>

                    <label htmlFor="" className='ml-10 mt-7 mb-1'>Name</label>
                    <div className='flex items-center gap-3 rounded-md border border-gray-300 w-[80%] ml-10 h-10 text-gray-800'>
                        <User size={20} className='text-gray-500 ml-2' />
                        <input
                            id='name'
                            type="text"
                            placeholder='Enter your name'
                            className='w-[90%] h-10 outline-none'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />
                    </div>

                    <label htmlFor="" className='ml-10 mt-6 mb-1'>Email</label>
                    <div className='flex items-center gap-3 rounded-md border border-gray-300 w-[80%] ml-10 h-10 text-gray-800'>
                        <Mail size={20} className='text-gray-500 ml-2' />
                        <input
                            id='email'
                            type="email"
                            placeholder='Enter your email'
                            className='w-[90%] h-10 outline-none'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>

                    <label htmlFor="" className='ml-10 mt-6 mb-1'>Password</label>
                    <div className='flex items-center gap-3 rounded-md border border-gray-300 w-[80%] ml-10 h-10 text-gray-800'>
                        <LockKeyhole size={20} className='text-gray-500 ml-2' />
                        <input
                            id='password'
                            type="password"
                            placeholder='Enter your password'
                            className='w-[90%] h-10 outline-none'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>

                    <label className='ml-10 mt-6'>Role</label>
                    <div className="flex mt-2 justify-center gap-4">
                        <button
                            type="button"
                            onClick={() => setRole("student")}
                            className={`flex items-center gap-2 rounded-md border w-[40%] max-w-40 p-3 transition ${role === "student"
                                ? "bg-blue-50 border-blue-600 text-blue-700"
                                : "border-gray-300 text-gray-900 hover:bg-blue-50 hover:border-blue-600"
                                }`}
                        >
                            <GraduationCap size={22} />
                            Student
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole("recruiter")}
                            className={`flex items-center gap-2 rounded-md border w-[40%] max-w-40 p-3 transition ${role === "recruiter"
                                ? "bg-blue-50 border-blue-600 text-blue-700"
                                : "border-gray-300 text-gray-900 hover:bg-blue-50 hover:border-blue-600"
                                }`}
                        >
                            <BriefcaseBusiness size={20} />
                            Recruiter
                        </button>
                    </div>

                    {error && (
                        <p role="alert" className="text-red-600 text-sm text-center mt-3">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer disabled:opacity-60 w-[80%] h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md mt-4 ml-10"
                    >
                        {loading ? "Creating account..." : "Sign up"}
                    </button>

                    <p className="text-gray-600 text-center mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Sign in
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default signupPage;
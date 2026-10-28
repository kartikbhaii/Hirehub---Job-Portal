
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
}

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Job>(`/api/jobs/${id}`)
      .then(({ data }) => setJob(data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading job...</p>;
  if (!job) return <p className="text-center mt-10">Job not found.</p>;

  return (
    <main className="min-h-screen bg-[#EFF5F9]">
      <div className="w-[65%] mx-auto pt-6">
        <div className="border-b border-gray-300 pb-4">
          <button
            onClick={() => router.push("/jobs")}
            className="text-blue-700 hover:text-blue-800 cursor-pointer"
          >
            Back to jobs
          </button>

          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">
                {job.title}
              </h1>
              <p className="text-gray-500 mt-1">{job.company}</p>
            </div>

            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Apply Now
            </Link>
          </div>

          <div className="flex items-center gap-3 mt-4 text-gray-500">
            <Image src="/location.png" alt="Location" width={15} height={15} />
            <p>{job.location}</p>
            <Image src="/money.png" alt="Salary" width={15} height={15} />
            <p>{job.salary}</p>
          </div>
        </div>

        <h2 className="mt-6 font-semibold text-gray-700">Job Description</h2>
        <p className="text-gray-500 mt-2">{job.description}</p>

        <h2 className="mt-6 font-semibold text-gray-700">Requirements</h2>
        <ul>
          {job.requirements.map((requirement, index) => (
            <li key={index} className="mt-2 text-gray-500 flex items-center gap-2">
              <Image src="/dot.png" alt="" width={20} height={20} />
              {requirement}
            </li>
          ))}
        </ul>

        <h2 className="mt-6 font-semibold text-gray-700">
          About {job.company}
        </h2>
        <p className="text-gray-500 mt-2">{job.company}</p>
      </div>
    </main>
  );
};

export default JobDetails;

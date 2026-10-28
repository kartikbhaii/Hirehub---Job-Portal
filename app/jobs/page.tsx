
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
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

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Job[]>("/api/jobs")
      .then(({ data }) => setJobs(data))
      .catch((error) => console.error("Failed to load jobs:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#EFF5F9]">
      <div className="w-10/12 mx-auto">
        <section className="justify-center items-center text-center p-10">
          <h1 className="text-4xl font-semibold text-[#39393c]">
            Explore Jobs
          </h1>
          <p className="text-gray-500">
            Find your next opportunity today
          </p>
        </section>

        <section>
          <SearchBar />
        </section>

        <section className="mt-10">
          {loading ? (
            <p className="text-center text-gray-500">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-center text-gray-500">
              No jobs available yet.
            </p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white text-gray-500 m-6 p-4 rounded"
              >
                <div className="flex justify-between items-center">
                  <div className="w-3/12">
                    <h2 className="font-semibold text-[#155DFC]">
                      {job.title}
                    </h2>
                    <p className="text-md">{job.company}</p>
                  </div>

                  <div className="flex justify-between items-center gap-6 w-7/12 text-gray-600">
                    <Image
                      src="/location.png"
                      alt="Location"
                      width={15}
                      height={15}
                      className="-mr-4"
                    />
                    <p>{job.location}</p>

                    <Image
                      src="/money.png"
                      alt="Salary"
                      width={15}
                      height={15}
                      className="-mr-4"
                    />
                    <p>{job.salary}</p>

                    <Link
                      href={`/jobs/${job._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default Jobs;

import SearchBar from "../components/SearchBar";
import Link from "next/link";
import Image from "next/image";
import { jobs } from "../lib/data/jobData";

const Jobs = () => {
  return (
    <main className="h-screen bg-[#EFF5F9]">
      <div className="w-10/12 mx-auto">
        <section className="justify-center items-center text-center p-10 ">
          <h1 className="text-4xl font-semibold text-[#39393c]">Explore Jobs</h1>
          <p className="text-gray-500">Find your next opportunity today</p>
        </section>

        <section className="">
          <SearchBar />
        </section>

        <section className="mt-10 ">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white text-gray-500 m-6 p-4 rounded  ">
              <div className="flex justify-between items-center">
                <div className=" w-3/12">
                  <h1 className="font-semibold text-[#155DFC]">{job.title}</h1>
                  <p className="text-md">{job.company}</p>
                </div>
                <div className="flex justify-between items-center gap-2 w-7/12 text-gray-600">
                  <Image src="/location.png" alt="location-img" width={15} height={15} />
                  <p className=" text-gray-500">{job.location}</p>
                  <Image src="/money.png" alt="salary-img" width={15} height={15} />
                  <p className=" text-gray-500">{job.salary}</p>
                  <Image src="/briefcase.png" alt="briefcase-img" width={15} height={15} />
                  <p className=" text-gray-500">{job.experience}</p>
                  <Image src="/time.png" alt="time-img" width={15} height={15} />
                  <p className=" text-gray-500">{job.type}</p>
                  <Link href={`/jobs/${job.id}`} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded ">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Jobs;


'use client'
import { useParams } from "next/navigation"
import { jobs } from "@/app/lib/data/jobData"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

const JobDetails = () => {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const job = jobs.find((job) => job.id === id)

    if (!job) {
        return <p>Job not found.</p>
    }

    return (
        <main>
            <div className="w-[65%] mx-auto pt-4">
                <div className="border-b border-gray-300 pb-4">
                    <button onClick={() => router.back()} className="text-blue-700 hover:text-blue-800 cursor-pointer">Back to jobs</button>
                    <div className="flex items-center justify-between mt-4">
                        <h1 className="text-3xl font-semibold">{job.title}</h1>
                        <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Apply Now</Link>
                    </div>
                    <div className="flex  items-center gap-6 mt-4">
                        <Image className="-mr-4" src="/location.png" alt="location-img" width={15} height={15} />
                        <p className=" text-gray-500">{job.location}</p>
                        <Image className="-mr-4" src="/money.png" alt="salary-img" width={15} height={15} />
                        <p className=" text-gray-500">{job.salary}</p>
                        <Image className="-mr-4" src="/briefcase.png" alt="briefcase-img" width={15} height={15} />
                        <p className=" text-gray-500">{job.experience}</p>
                        <Image className="-mr-4" src="/time.png" alt="time-img" width={15} height={15} />
                        <p className=" text-gray-500">{job.type}</p>
                    </div>
                </div>

                <h2 className="mt-4 font-semibold text-gray-700">Job Description</h2>
                <p className="text-gray-500">{job.description}</p>

                <h2 className="mt-4 font-semibold text-gray-700">Requirements</h2>
                <ul>
                    {job.requirements.map((requirement, index) => (
                        <li key={index} className="mt-2 text-gray-500 flex items-center gap-2" ><Image src="/dot.png" alt="pointer-img" width={20} height={20} />{requirement}</li>
                    ))}
                </ul>

                <h2 className="mt-4 font-semibold text-gray-700">About {job.company}</h2>
                <p className="text-gray-500">{job.companyDescription}</p>
            </div>
        </main>
    )
}

export default JobDetails;
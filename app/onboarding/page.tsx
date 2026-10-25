
import Image from "next/image";

export default function OnboardingPage() {
    return (
        <main className="bg-[#EFF5F9] h-screen">
            <div className="max-w-5xl mx-auto px-4 py-8 ">
                <div className="max-w-2xl mx-auto text-center  ">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Welcome to Hire<span className="text-[#0647ae]">Hub</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        To get the most out of your experience, please tell us a bit about
                        yourself.
                    </p>
                </div>


                {/* Buttons */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <button className="border-2 border-gray-300 hover:border-blue-600 rounded-lg p-6 hover:bg-blue-50 transition-colors bg-gray-50 cursor-pointer">
                        <div className="flex items-center justify-center mb-8 mx-25">
                            <Image src="/student.png" alt="student" width={100} height={100} />
                        </div>
                        <h2 className="text-2xl font-semibold">I'm looking for a job</h2>
                        <p className="text-gray-500 mt-2">
                            Find jobs that match your skills and interests
                        </p>
                    </button>

                    <button className="border-2 border-gray-300 hover:border-blue-600 rounded-lg p-6 hover:bg-blue-50 transition-colors bg-gray-50 cursor-pointer">
                        <div className="flex items-center justify-center mb-8 mx-25">
                            <Image src="/recruiter.png" alt="recruiter" width={100} height={100} />
                        </div>
                        <h2 className="text-2xl font-semibold">I'm hiring talent</h2>
                        <p className="text-gray-500 mt-2">
                            Find the best talent for your company
                        </p>
                    </button>
                </div>
            </div>
        </main>
    );
}

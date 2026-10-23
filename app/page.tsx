import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1 bg-[#EFF5F9]">
      <section className="flex min-h-90 items-center justify-center bg-[#EFF5F9] px-6 sm:min-h-105">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-12">
          <div>
            <h1 className="text-4xl leading-normal font-bold text-[#39393c] sm:text-5xl lg:text-6xl">
              Find Your Dream Job
              <span className="text-blue-800"> Today.</span>
            </h1>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-gray-500 sm:text-md ">
              Explore thousands of job opportunities from top companies and take
              the next step in your career.
            </p>
          </div>
          <Image
            src="/hero-image.png"
            alt="A pen launching through a cloud"
            width={400}
            height={500}
            priority
            className="w-auto h-auto max-w-140"
          />
        </div>
      </section>

      <section>
        <form action="/jobs" method="get" className="">
              <div className="ml-48 h-16 w-[40%] rounded-md shadow-[0_0_10px_1px_rgba(0,0,0,0.2)] bg-white">
                <label htmlFor="" className="flex items-center p-2">
                  <Image
                    src="/search-img.png"
                    alt="search-log"
                    width={30}
                    height={30}
                    className="w-auto h-auto"
                  />
                  <input
                    type="text"
                    placeholder="Job title or Keywords"
                    className="ml-2 h-12 w-[80%] text-lg text-gray-600 outline-none"
                  />
                  <button className="w-[20%] rounded-sm bg-blue-600 hover:bg-blue-700 p-2 text-lg text-white cursor-pointer">
                    Find Jobs
                  </button>
                </label>
              </div>
            </form>
      </section>

    </main>
  );
}

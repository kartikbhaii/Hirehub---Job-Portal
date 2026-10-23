
import Image from "next/image"

const SearchBar = () => {
  return (
    <section>
            <form action="/jobs" method="get" className="">
                  <div className=" w-8/12 mx-auto h-16 rounded-md bg-white border border-gray-200">
                    <label htmlFor="" className="flex items-center p-2">
                      <Image
                        src="/search-img.png"
                        alt="search-logo"
                        width={30}
                        height={30}
                      />
                      <input
                        type="text"
                        placeholder="Search jobs, companies or locations..."
                        className="ml-2 h-12 w-[80%] text-lg text-gray-600 outline-none"
                      />
                      <button className="w-[20%] rounded-sm bg-blue-600 hover:bg-blue-700 p-2 text-lg text-white cursor-pointer">
                        Find Jobs
                      </button>
                    </label>
                  </div>
                </form>
          </section>
  )
}

export default SearchBar
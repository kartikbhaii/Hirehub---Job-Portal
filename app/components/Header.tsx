"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, [pathName])

  const handleLogout = async () => {
  try {
    await axios.post("/api/auth/logout");
    setIsLoggedIn(false);
    toast.success("Logout successful!");
    router.push("/");
    router.refresh();
  } catch {
    toast.error("Logout failed");
  }
};

  return (
    <header className="w-full p-6 border-b border-gray-300 flex justify-around gap-30">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo-hirehub.png"
              alt="HireHub-logo"
              width={150}
              height={50}
              className="w-32 h-auto"
              loading="eager"
            />
          </Link>

          <nav>
            <ul className="flex ml-8 gap-6 text-[#525252]">
              <li className="hover:text-blue-800">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-blue-800">
                <Link href="/jobs">Jobs</Link>
              </li>
              <li className="hover:text-blue-800">
                <Link href="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex gap-4 text-[#454545] items-center">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="cursor-pointer text-[#454545] p-1.5 hover:text-blue-800">
                Login
              </Link>

              <div className="h-8 border-l border-gray-200" />

              <Link href="/signup" className="cursor-pointer bg-blue-800 p-1.5 rounded-lg text-white">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="cursor-pointer bg-blue-800 hover:bg-blue-900 p-1.5 px-4 rounded-lg text-white"
            >
              Logout
            </button>
          )}
        </div>
    </header>
  );
};

export default Header;

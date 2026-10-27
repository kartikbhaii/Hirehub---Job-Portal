"use client";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full p-6 border-b border-gray-300 flex justify-around gap-30">
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
        {/* <Show when="signed-out"> */}
        {/* <SignInButton mode="modal" forceRedirectUrl="/auth/continue"> */}
        <Link href="/login" className="cursor-pointer text-[#454545] p-1.5 hover:text-blue-800">
          Login
        </Link>
        {/* </SignInButton> */}

        {/* <SignUpButton mode="modal" forceRedirectUrl="/auth/continue"> */}
        {/* <button className="cursor-pointer bg-blue-700 hover:bg-blue-800 rounded-lg p-1.5 text-white">
          Signin
        </button> */}
        {/* </SignUpButton> */}
        {/* </Show> */}

        <div className="h-8 border-l border-gray-200" />

        <Link href="/signup" className="cursor-pointer bg-blue-800 p-1.5 rounded-lg text-white">
          Signup
        </Link>

        {/* <Show when="signed-in">
          <UserButton />
        </Show> */}
      </div>
    </div>
  );
};

export default Header;

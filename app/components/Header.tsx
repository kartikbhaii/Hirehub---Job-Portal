import Image from "next/image";
import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
const Header = () => {
  return (
    <div className=" w-full p-6 border-b border-gray-300 flex justify-around gap-30">
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
          <ul className="flex ml-8 gap-6 text-[#525252] ">
            <li className="hover:text-blue-800">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-blue-800">
              <Link href="/jobs">Jobs</Link>
            </li>
            <li className="hover:text-blue-800">
              <Link href="/companies">Companies</Link>
            </li>
            <li className="hover:text-blue-800">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>


      <div className="flex gap-4 text-[#454545] items-center">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="cursor-pointer text-[#454545] hover:text-blue-800">
              Login
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="cursor-pointer bg-blue-800 hover:bg-blue-900 rounded-lg p-1.5 text-white">
              Signup
            </button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <UserButton />
        </Show>

        <div className="h-8 border-l border-gray-300"></div>

        <Link href="/" className="hover:text-blue-800">
          Employers / Post Job
        </Link>
      </div>
    </div>
  );
};

export default Header;

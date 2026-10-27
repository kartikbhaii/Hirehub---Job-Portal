import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto border border-slate-300 bg-[#f7f9fc] px-4 py-5 text-sm text-slate-500 sm:px-4">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <Link
            href="/"
            aria-label="HireHub home"
            className="text-xl leading-none font-semibold tracking-tight text-slate-900"
          >
            Hire<span className="text-blue-700">Hub</span>
          </Link>
          <p>Better jobs. Brighter futures.</p>
          <p className="pt-2 text-xs">© 2026 HireHub. All rights reserved.</p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-x-6 gap-y-3 text-slate-600"
        >
          <Link href="/" className="transition-colors hover:text-blue-700">
            Home
          </Link>
          <Link href="/jobs" className="transition-colors hover:text-blue-700">
            Jobs
          </Link>
          <Link href="/about" className="transition-colors hover:text-blue-700">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

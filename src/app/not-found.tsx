import Link from "next/link";
import { projectName } from "@/config/project";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <p className="mb-6 text-tiny font-medium uppercase tracking-[0.45em] text-black">
        {projectName} — Abu Dhabi
      </p>
      <h1 className="font-serif text-heading-1 text-[#141414]">404</h1>
      <p className="mt-6 max-w-md font-serif text-heading-3 font-light italic text-[#2a2a2a]">
        The page you are looking for could not be found.
      </p>
      <Link
        href="/"
        className="mt-12 inline-flex items-center gap-3 bg-gradient-to-r from-[#292929] to-[#010101] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all duration-400 hover:from-[#3d3d3d] hover:to-[#010101]"
      >
        Return Home
      </Link>
    </main>
  );
}
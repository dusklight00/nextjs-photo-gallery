import Image from "next/image";
import Link from "next/link";
import Search from "../components/Search";

const NavBar = () => {
  return (
    <div className="p-2 border-b border-solid border-gray-400">
      <div className="navbar bg-base-100 flex justify-between">
        <div className="">
          {/* <Link href="/">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/next.svg"
              alt="Next.js Logo"
              width={120}
              height={37}
              priority
            />
          </Link> */}
          <div className="text-3xl font-bold m-4">Photo Gallery</div>
        </div>
        <div className="flex justify-center mx-6">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

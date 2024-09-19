import Image from "next/image";
import Link from "next/link";
import Search from "../components/Search";

const NavBar = () => {
  return (
    <div className="p-2 border-b border-solid border-gray-400">
      <div className="navbar bg-base-100 flex justify-between">
        <div className="">
          <div className="text-3xl font-bold m-4">Photo Gallery</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

const Header = () => {
  const [menu, setMenu] = useState(false);
  return (
    <header className="fixed z-10 mx-auto flex h-[60px] w-full translate-y-0 transform items-center justify-between  bg-black bg-opacity-65 px-5 sm:px-8 md:px-12 lg:px-16">
      {/* Column 1 : Logo */}
      <section>
        <img
          src="/assets/logo-yello.png"
          alt="logo"
          className="h-[40px] cursor-pointer"
        />
      </section>

      {/* Column 2: Hamburger icons (visible in mobile view) */}
      <section className={`flex items-center space-x-4 md:hidden`}>
        <HiOutlineSearch className="text-2xl text-white" />
        <SlMenu
          className={`text-2xl text-white ${!menu ? "block" : "hidden"}`}
          onClick={() => setMenu((prev) => !prev)}
        />
        <VscChromeClose
          className={`text-2xl text-white ${menu ? "block" : "hidden"}`}
          onClick={() => setMenu((prev) => !prev)}
        />
      </section>

      {/* Column 3: Navigation (visible from md breakpoint and above) */}
      <section className={`hidden text-white md:block`}>
        <ul className="flex items-center space-x-5 ">
          <li>Movies</li>
          <li>TV Shows</li>
          <li className="">
            <HiOutlineSearch size={20} />
          </li>
        </ul>
      </section>
    </header>
  );
};

export default Header;

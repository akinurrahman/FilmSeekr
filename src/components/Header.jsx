import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [searchField, setSearchField] = useState(false);

  const openSearch = () => {
    setMenu(false);
    setSearchField((prev) => !prev);
  };

  const openMobileMenu = () => {
    setMenu((prev) => !prev);
    setSearchField(false);
  };

  return (
    <header className="fixed z-10 w-full">
      <section className="mx-auto  flex h-[60px]  items-center justify-between  bg-black bg-opacity-40 px-5 sm:px-8 md:px-12 lg:px-16">
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
          <HiOutlineSearch
            className="cursor-pointer text-2xl text-white"
            onClick={openSearch}
          />
          <SlMenu
            className={`cursor-pointer text-2xl text-white ${
              !menu ? "block" : "hidden"
            }`}
            onClick={openMobileMenu}
          />
          <VscChromeClose
            className={`cursor-pointer text-2xl text-white ${
              menu ? "block" : "hidden"
            }`}
            onClick={openMobileMenu}
          />
        </section>

        {/* Column 3: Navigation (visible from md breakpoint and above) */}
        <nav className={`hidden text-white md:block`}>
          <ul className="flex items-center space-x-5 ">
            <li>Movies</li>
            <li>TV Shows</li>
            <li>
              <HiOutlineSearch size={20} onClick={openSearch} />
            </li>
          </ul>
        </nav>
      </section>

      {/* show only when menu state is true */}
      <section className={`${menu ? "block" : "hidden"} `}>
        <ul className="bg-black bg-opacity-40 text-white">
          <li className="mx-5 py-3  text-xl font-medium">Movies</li>
          <li className="mx-5 py-3 text-xl  font-medium">TV Shows</li>
        </ul>
      </section>

      {/* Section visible when searchField state is true */}
      <section className={`relative  ${searchField ? "block" : "hidden"}`}>
        <input
          type="text"
          className="w-full px-4 pr-[60px] py-3 outline-none"
          placeholder="Search for a movie or a tv show"
        />
        <VscChromeClose
          size={20}
          className="absolute right-6 top-4   cursor-pointer"
          onClick={openSearch}
        />
      </section>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [searchField, setSearchField] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const openSearch = () => {
    setMenu(false);
    setSearchField((prev) => !prev);
  };

  const openMobileMenu = () => {
    setMenu((prev) => !prev);
    setSearchField(false);
  };
  const handleSearch = (endpoint) => {
    if (endpoint !== "") {
      navigate(`/search/${endpoint}`);
      setSearchField((prev) => !prev);
    }
  };

  const handleNevigate = (type) => {
    navigate(`/explore/${type}`);
    setMenu(false);
  };
  return (
    <header className="fixed  z-10 w-full bg-black bg-opacity-40  ">
      <section className=" mx-auto flex h-[60px]   w-full max-w-[1200px]  items-center justify-between  px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Column 1 : Logo */}
        <section>
          <img
            src="/assets/logo-yello.png"
            alt="logo"
            onClick={() => navigate("/")}
            className="h-[40px] cursor-pointer"
          />
        </section>

        {/* Column 2: Hamburger icons (visible in mobile view) */}
        <section className={`flex items-center space-x-4 md:hidden`}>
          <HiOutlineSearch
            className="cursor-pointer text-2xl text-white"
            onClick={openSearch}
          />
          {menu ? (
            <VscChromeClose
              className="block cursor-pointer text-2xl text-white"
              onClick={openMobileMenu}
            />
          ) : (
            <SlMenu
              className="block cursor-pointer text-2xl text-white"
              onClick={openMobileMenu}
            />
          )}
        </section>

        {/* Column 3: Navigation (visible from md breakpoint and above) */}
        <nav className={`hidden text-white md:block`}>
          <ul className="flex items-center space-x-5 ">
            <li
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => handleNevigate("Movies")}
            >
              Movies
            </li>
            <li
              className="cursor-pointer hover:text-yellow-300"
              onClick={() => handleNevigate("TV Shows")}
            >
              TV Shows
            </li>
            <li className="cursor-pointer hover:text-yellow-300">
              <HiOutlineSearch size={20} onClick={openSearch} />
            </li>
          </ul>
        </nav>
      </section>

      {/* show only when menu state is true */}
      <section className={`${menu ? "block" : "hidden"} md:hidden `}>
        <ul className="bg-black bg-opacity-40 text-white">
          <li
            className="mx-7 cursor-pointer  py-2 text-xl font-medium hover:text-yellow-300"
            onClick={() => handleNevigate("Movies")}
          >
            Movies
          </li>
          <li
            className="mx-7 cursor-pointer py-2 pb-5  text-xl font-medium hover:text-yellow-300"
            onClick={() => handleNevigate("TV Shows")}
          >
            TV Shows
          </li>
        </ul>
      </section>

      {/* Section visible when searchField state is true */}
      <section className={` bg-white ${searchField ? "block" : "hidden"}`}>
        <div className=" relative mx-[23px] sm:mx-[30px] md:mx-[45px] lg:mx-[60px] xl:mx-[110px] 2xl:mx-[228px]">
          <input
            type="text"
            className="w-full  py-3  outline-none "
            placeholder="Search for a movie or a tv show"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            value={query}
          />
          <VscChromeClose
            size={20}
            className="absolute right-0 top-4 cursor-pointer "
            onClick={openSearch}
          />
        </div>
      </section>
    </header>
  );
};

export default Header;

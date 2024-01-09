import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <section className="footer bg-[#020C1B] py-8 text-white ">
      <footer className="mx-auto w-full max-w-[1200px] px-5">
        <ul className="menuItems flex  justify-center gap-3 px-4 py-5 text-xs font-medium md:gap-7">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <section className="infoText text-center text-sm leading-none text-[#6e6f75]">
          Welcome to FilmSeekr, your ultimate destination for discovering,
          exploring, and enjoying a vast collection of movies and TV shows. Dive
          into an immersive experience where you can find in-depth information,
          reviews, and recommendations on the latest and greatest in the world
          of entertainment.
        </section>
        <section className="socialIcons flex justify-center space-x-4  py-5">
          <NavLink
            to="https://github.com/akinurrahman/FilmSeekr/"
            className="icon rounded-full bg-[#04152D] p-4 "
          >
            <FaGithub />
          </NavLink>
          <NavLink
            to="https://www.instagram.com/akinurrahman_/"
            className="icon rounded-full bg-[#04152D] p-4"
          >
            <FaInstagram />
          </NavLink>
          <NavLink
            to="https://twitter.com/akinur_"
            className="icon rounded-full bg-[#04152D] p-4"
          >
            <FaTwitter />
          </NavLink>
          <NavLink
            to="https://www.linkedin.com/in/akinurrahman"
            className="icon rounded-full bg-[#04152D] p-4"
          >
            <FaLinkedin />
          </NavLink>
        </section>
      </footer>
    </section>
  );
};

export default Footer;

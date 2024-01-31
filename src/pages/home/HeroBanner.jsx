import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateTMDBImageUrl } from "../../utility/generateTMDBImageUrl";
import Img from "../../components/LazyLoadImg";
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesAndShows } from "../../api/api";

const Banner = () => {
  const [query, setQuery] = useState("");
  const [background, setBackground] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const navigate = useNavigate();

  // API call with react query
  const { data, isLoading } = useQuery({
    queryKey: ["trending", "day"],
    queryFn: () => fetchMoviesAndShows("trending/all/day"),
    staleTime: Infinity,
  });

  // Randomly select an image from the fetched data
  useEffect(() => {
    if (data?.results?.length > 0) {
      const randomIndex =
        Math.floor(Math.random() * data?.results?.length) || 0;
      const imagePath =
        data?.results?.[randomIndex]?.backdrop_path ||
        "/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg";
      const imgUrl = generateTMDBImageUrl(imagePath, "w1280");
      const lowQualityImg = generateTMDBImageUrl(imagePath, "w92");

      // Set the URLs for the background and placeholder images
      setPlaceholder(lowQualityImg);
      setBackground(imgUrl);
    }
  }, [data]);

  // Function to navigate to the search page
  const handleSearch = (endpoint) => {
    if (endpoint !== "") {
      navigate(`/search/${endpoint}`);
    }
  };

  // Define linear gradient style for the opacity layer
  const linearGradient = {
    backgroundImage:
      "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%)",
  };

  return (
    <section className="heroBanner relative flex h-[400px] w-full items-center bg-[#04152d] md:h-[700px]">
      {/* Display the background image */}
      {!isLoading && (
        <div className="backdrop-img absolute left-0 top-0 h-full w-full overflow-hidden opacity-50">
          <Img
            src={background}
            className=" h-full w-screen object-cover object-center"
            alt="Background"
            placeholder={placeholder}
          />
        </div>
      )}

      {/* Apply linear gradient for the opacity layer */}
      <div
        className="opacity-layer absolute bottom-0 left-0 h-[250px] w-full"
        style={linearGradient}
      ></div>

      {/* Content */}
      <section className="mx-auto w-full max-w-[1200px] px-5">
        <div className="heroBannerContent relative mx-auto flex max-w-[800px] flex-col items-center text-center text-white">
          {/* Title */}
          <span className="title text-3xl font-bold sm:text-4xl md:text-5xl xl:text-6xl">
            Welcome to FilmSeeKr
          </span>

          {/* Subtitle */}
          <span className="subTitle mb-8 py-1 leading-none">
            Discover Countless Movies, TV Shows, and Intriguing Talents Awaiting
            Your Exploration
          </span>

          {/* Search input */}
          <div className="searchInput flex w-full items-center">
            <input
              type="text"
              placeholder="Search for movie or TV shows"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
              className="h-[50px] w-full rounded-bl-[30px] rounded-tl-[30px] border-0 border-transparent bg-white px-4 pr-[-100px] text-sm text-black outline-none md:h-[60px] md:px-[30px] md:text-[20px]"
            />
            <button
              onClick={() => handleSearch(query)}
              className="h-[50px] w-[100px] cursor-pointer rounded-br-[30px] rounded-tr-[30px]  bg-gradient-to-r from-yellow-200 to-yellow-500  font-semibold text-[#333333]  md:h-[60px] md:w-[150px] md:text-lg"
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Banner;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../components/ContentWrapper";
import { useUpcommingMoviesQuery } from "../../api/fetchMovies";
import { generateTMDBImageUrl } from "../../utility/generateTMDBImageUrl";

const Banner = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useUpcommingMoviesQuery("/movie/popular");

  const randomIndex = Math.floor(Math.random() * data?.results?.length) || "";
  const imagePath = data?.results?.[randomIndex]?.backdrop_path || "";
  const background = generateTMDBImageUrl(imagePath);

  const handleSearch = (endpoint) => {
    if (endpoint !== "") {
      navigate(`/search/${endpoint}`);
    }
  };

  const linearGradient = {
    backgroundImage:
      "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%)",
  };

  return (
    <div className="heroBanner relative  flex h-[450px] w-full items-center bg-[#04152d] md:h-[700px]">
      {!isLoading && (
        <div className="backdrop-img absolute left-0 top-0 h-full w-full overflow-hidden opacity-50">
          <img
            src={background}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
      <div
        className="opacity-layer absolute bottom-0  left-0 h-[250px] w-full "
        style={linearGradient}
      ></div>
      <ContentWrapper>
        <div className="heroBannerContent relative mx-auto flex max-w-[800px] flex-col items-center text-center text-white ">
          <span className="title mb-2 text-[50px] font-bold md:mb-[-20px] md:text-[90px]">
            Welcome
          </span>
          <span className="subTitle mb-[40px] text-[18px] font-medium md:text-[24px]">
            Millions of movies, TV shows and people to discover. Explore now
          </span>
          <div className="searchInput flex w-full items-center ">
            <input
              type="text"
              placeholder="Search for movie or tv shows"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
              className="h-[50px] w-full rounded-bl-[30px] rounded-tl-[30px] border-0 border-transparent bg-white px-4 pr-[-100px] text-sm text-black outline-none md:h-[60px] md:px-[30px] md:text-[20px]"
            />
            <button
              onClick={() => handleSearch(query)}
              className="h-[50px] w-[100px] cursor-pointer rounded-br-[30px] rounded-tr-[30px] border-0 border-transparent bg-gradient-to-r from-red-500 to-orange-500 text-base text-white outline-none md:h-[60px] md:w-[150px] md:text-lg"
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Banner;

import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { generateTMDBImageUrl } from "../utility/generateTMDBImageUrl";
import posterNotFound from "../assets/no-poster.png";
import dayjs from "dayjs";
import Img from "./LazyLoadImg";
import CircleRating from "./CircleRating";
import Genres from "./Genres";

const Crousel = ({ data, loading, error }) => {
  // Creating skeletons for loading state
  const skeletons = Array.from({ length: 20 }, (_, index) => (
    <div
      key={index}
      className="min-w-[47%] animate-pulse  cursor-pointer sm:min-w-[23%] md:min-w-[19%] xl:min-w-[16%]"
    >
      <div className="poster-block h-[206px] rounded-xl bg-blue-950 lg:h-[250px] xl:h-[297px]"></div>
      <div className="text-block">
        <div className="title my-2 mt-6 h-4 w-full bg-blue-950"></div>
        <div className="time h-4 w-full bg-blue-950"></div>
      </div>
    </div>
  ));

  // Display error message if error
  if (error) {
    const errorMessage = error?.data?.status_message || "An error occurred";
    return (
      <div className="mx-auto h-20 max-w-[1200px] px-6 py-4 text-red-500">
        Error: {errorMessage}
      </div>
    );
  }

  // Ref for accessing the carousel container
  const crouselContainer = useRef();

  // Function to handle carousel scrolling
  const carouselScrollHandler = (direction) => {
    const container = crouselContainer.current;
    // Calculate the amount to scroll based on the specified direction
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - container.offsetWidth
        : container.scrollLeft + container.offsetWidth;

    // Scroll to the calculated position with smooth animation
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative mx-auto w-full max-w-[1200px]">
      {/* Left arrow */}
      <BsFillArrowLeftCircleFill
        className="absolute left-8 top-[35%] z-10 hidden cursor-pointer text-3xl text-[#b38e8e] md:block"
        onClick={() => carouselScrollHandler("left")}
      />
      {/* Right arrow */}
      <BsFillArrowRightCircleFill
        className="absolute right-6 top-[35%] z-10 hidden cursor-pointer text-3xl text-[#b38e8e] md:block"
        onClick={() => carouselScrollHandler("right")}
      />

      {/* Display data if not loading */}
      {!loading && !error && data?.length > 0 ? (
        <div
          className="crouselItems flex w-full gap-3 overflow-auto p-4"
          ref={crouselContainer}
        >
          {/* Mapping through data to display */}
          {data?.map((currItem, index) => {
            const poster_path = currItem?.poster_path || "";
            const poster =
              generateTMDBImageUrl(poster_path, "w500") || posterNotFound;
            const placeholder =
              generateTMDBImageUrl(poster_path, "w92") || posterNotFound;

            return (
              <div
                key={currItem.id + index}
                className=" min-w-[47%] cursor-pointer  sm:min-w-[23%] md:min-w-[19%] xl:min-w-[16%]"
              >
                <div className="posterBlock relative w-full  ">
                  {/* Displaying images */}
                  <Img
                    src={poster}
                    className="h-[206px] w-full rounded-xl bg-blue-950  lg:h-[250px] xl:h-[297px] "
                    placeholder={placeholder}
                  />
                </div>
                {/* Displaying circle ratings and genres */}
                <CircleRating rating={currItem.vote_average.toFixed(1)} />
                <Genres data={currItem.genre_ids.slice(0, 2)} />

                {/* Displaying movie/TV show details */}
                <div className="textBlock ">
                  <div className="  line-clamp-1  w-full font-semibold lg:text-[18px]">
                    {currItem?.title || currItem?.name}
                  </div>
                  <div className=" line-clamp-1  w-full font-normal text-gray-400">
                    {dayjs(currItem?.release_date).format("MMM DD YYYY")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Showing skeletons during loading
        <section className="flex w-full cursor-pointer gap-3 overflow-auto p-4">
          {skeletons}
        </section>
      )}
    </section>
  );
};

export default Crousel;

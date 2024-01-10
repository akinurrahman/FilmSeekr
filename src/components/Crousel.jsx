import React from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { generateTMDBImageUrl } from "../utility/generateTMDBImageUrl";
import posterNotFound from "../assets/no-poster.png";
import dayjs from "dayjs";
import Img from "./LazyLoadImg";

const Crousel = ({ data, loading, error }) => {
  // Creating skeletons for loading state
  const skeletons = Array.from({ length: 20 }, (_, index) => (
    <div
      key={index}
      className="min-w-[42%] animate-pulse cursor-pointer sm:min-w-[22%] lg:min-w-[17%]"
    >
      <div className="poster-block h-[206px] rounded-xl bg-blue-950 lg:h-[250px] xl:h-[297px]"></div>
      <div className="text-block">
        <div className="title my-3 h-4 w-full bg-blue-950"></div>
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

  return (
    <section>
      <section className="relative mx-auto w-full max-w-[1200px]">
        {/* Left arrow */}
        <BsFillArrowLeftCircleFill className="absolute left-8 top-[44%] hidden cursor-pointer text-3xl text-[#b38e8e] md:block" />
        {/* Right arrow */}
        <BsFillArrowRightCircleFill className="absolute right-6 top-[44%] hidden cursor-pointer text-3xl text-[#b38e8e] md:block" />

        {/* Display data if not loading */}
        {!loading && !error && data?.length > 0 ? (
          <div className="crouselItems flex w-full gap-3 overflow-auto p-4">
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
                  className="min-w-[42%] cursor-pointer sm:min-w-[22%] lg:min-w-[17%]"
                >
                  <div className="posterBlock">
                    {/* Displaying images */}
                    <Img
                      src={poster}
                      className="h-[206px] rounded-xl lg:h-[250px] xl:h-[297px]"
                      placeholder={placeholder}
                    />
                  </div>
                  <div>
                    {/* Displaying movie/TV show details */}
                    <div className="line-clamp-1 pt-1 font-semibold lg:text-[18px]">
                      {currItem?.title || currItem?.name}
                    </div>
                    <div className="font-normal text-gray-400">
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
    </section>
  );
};

export default Crousel;

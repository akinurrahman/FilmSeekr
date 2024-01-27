import React from "react";
import { useGetSearchQuery } from "../../api/fetchMovies";
import { useNavigate, useParams } from "react-router-dom";
import Img from "../../components/LazyLoadImg";
import posterNotFound from "../../assets/no-poster.png";
import dayjs from "dayjs";
import { generateTMDBImageUrl } from "../../utility/generateTMDBImageUrl";
import { skeletons } from "../../components/Skeleton";

const SearchResults = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const { data, isLoading, error } = useGetSearchQuery(
    `search/multi?query=${query}&page=${1}`
  );

  // Loading state - show skeletons
  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-5 px-4 pt-[75px] sm:grid-cols-4 md:grid-cols-5">
        {skeletons}
      </div>
    );
  }

  // Error state - show error message
  if (error) {
    const errorMessage =
      error?.data?.status_message || "An error occurred";
    return (
      <div className="mx-auto h-20 max-w-[1200px] px-6  py-16 text-red-500  ">
        Error: {errorMessage}
      </div>
    );
  }

  // Data loaded - display search results
  return (
    <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-5 px-4 pt-[75px] sm:grid-cols-4 md:grid-cols-5">
      {data?.results?.map((currItem) => {
        const poster_path = currItem?.poster_path || posterNotFound;
        const poster = currItem?.poster_path
          ? generateTMDBImageUrl(poster_path, "w500")
          : posterNotFound;
        const placeholder =
          generateTMDBImageUrl(poster_path, "w92") || posterNotFound;

        return (
          <div
            key={currItem.id}
            className="min-w-[47%] cursor-pointer sm:min-w-[23%] md:min-w-[19%] xl:min-w-[16%]"
            onClick={() => navigate(`/${currItem.media_type}/${currItem.id}`)}
          >
            <div className="posterBlock relative w-full">
              {/* Displaying images */}
              <Img
                src={poster}
                className="h-[206px] w-full rounded-xl bg-blue-950  lg:h-[250px] xl:h-[297px]"
                placeholder={placeholder}
              />
            </div>

            {/* Displaying movie/TV show details */}
            <div className="textBlock ">
              <div className="line-clamp-1 w-full font-semibold lg:text-[18px]">
                {currItem?.title || currItem?.name}
              </div>
              <div className="line-clamp-1 w-full font-normal text-gray-400">
                {dayjs(currItem?.release_date).format("MMM DD YYYY")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;

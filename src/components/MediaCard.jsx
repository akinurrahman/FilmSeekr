import React from "react";
import { generateTMDBImageUrl } from "../utility/generateTMDBImageUrl";
import posterNotFound from "../assets/no-poster.png";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Img from "./LazyLoadImg";

const MediaCard = ({ currItem, mediaType }) => {
  const navigate = useNavigate();

  const poster_path = currItem?.poster_path || posterNotFound;
  const poster = currItem?.poster_path
    ? generateTMDBImageUrl(poster_path, "w500")
    : posterNotFound;
  const placeholder =
    currItem?.poster_path && generateTMDBImageUrl(poster_path, "w92");
  return (
    <div
      className="min-w-[47%] cursor-pointer sm:min-w-[23%] md:min-w-[19%] xl:min-w-[16%]"
      onClick={() =>
        navigate(`/${currItem.media_type || mediaType}/${currItem.id}`)
      }
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
};

export default MediaCard;

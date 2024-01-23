import React from "react";
import { useParams } from "react-router-dom";
import { useFetchTBDBQuery } from "../../api/fetchMovies";
import { generateTMDBImageUrl } from "../../utility/generateTMDBImageUrl";
import noPoster from "../../assets/no-poster.png";
import Img from "../../components/LazyLoadImg";
import dayjs from "dayjs";
import { toHoursAndMinutes } from "../../utility/toHoursAndMinutes";

const Banner = () => {
  const { mediaType, id } = useParams();
  const { data } = useFetchTBDBQuery(`${mediaType}/${id}`);
  const poster = generateTMDBImageUrl(data?.poster_path, "w500") || noPoster;
  const title = data?.title || "";
  const overview = data?.overview || "";
  const status = data?.status || "";
  const releaseDate = data?.release_date || "";
  const genres = data?.genres || [];
  const rating = data?.vote_average || "";
  const tagline = data?.tagline || "";
  const runtime = toHoursAndMinutes(data?.runtime) || "";
  return (
    <section className="mx-auto min-h-[700px] max-w-[1200px] pt-[90px] md:flex ">
      <div className="  px-[22px] md:w-1/2">
        <Img src={poster} className={"w-full rounded-2xl md:w-[90%] lg:w-[60%]"} />
      </div>

      {/* Text block */}
      <div className="details__block mt-5 space-y-2 px-[22px] md:w-1/2">
        <h2 className="  text-3xl">{title}</h2>
        <p className="italic leading-none text-gray-400 ">{tagline}</p>
        <div className="flex items-center">
          {genres?.map((g, index) => (
            <span
              className="mx-[2px] rounded-md bg-pink-700 px-2 text-sm"
              key={index}
            >
              {g.name}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-semibold leading-none">Overview</h3>
        <p>{overview}</p>

        {/* ----------Status, Release Date, Runtime------------------ */}
        <div className="flex space-x-7">
          <div className="flex flex-col  sm:flex-row md:flex-col">
            <span className="text-lg font-semibold">Status:</span>
            <span className="font-semibold text-gray-400">{status}</span>
          </div>
          <div className="flex flex-col  sm:flex-row md:flex-col">
            <span className="text-lg font-semibold">Release Date:</span>
            <span className="font-semibold text-gray-400">
              {dayjs(releaseDate).format("MMM D, YYYY")}
            </span>
          </div>
          <div className="flex flex-col  sm:flex-row md:flex-col">
            <span className="text-lg font-semibold">Runtime:</span>
            <span className="font-semibold text-gray-400">{runtime}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

import React from "react";
import { useParams } from "react-router-dom";
import { generateTMDBImageUrl } from "../../utility/generateTMDBImageUrl";
import noPoster from "../../assets/no-poster.png";
import Img from "../../components/LazyLoadImg";
import dayjs from "dayjs";
import { toHoursAndMinutes } from "../../utility/toHoursAndMinutes";
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesAndShows } from "../../api/api";

const Banner = () => {
  const { mediaType, id } = useParams();

  // Fetch media details using React Query
  const { data } = useQuery({
    queryKey: [mediaType, id, "details"],
    queryFn: () => fetchMoviesAndShows(`${mediaType}/${id}`),
    staleTime: Infinity,
  });

  // Extract relevant data for display
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
    <section className="mx-auto min-h-[700px] max-w-[1100px] pt-[90px] md:flex ">
      {/* Poster block */}
      <div className="px-[22px] ">
        <Img src={poster} className={"mx-auto w-full rounded-2xl lg:w-[80%]"} />
      </div>

      {/* Text block */}
      <div className="details__block mt-5 space-y-2 px-[22px] md:w-[80%]">
        <h2 className="text-3xl">{title}</h2>
        <p className="italic leading-none text-gray-400 ">{tagline}</p>

        {/* Genres display */}
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

        {/* Status, Release Date, and Runtime display */}
        <div className="flex space-x-7">
          {/* Status */}
          <div className="flex flex-col  sm:flex-row md:flex-col">
            <span className="text-lg font-semibold">Status:</span>
            <span className="font-semibold text-gray-400">{status}</span>
          </div>

          {/* Release Date */}
          <div className="flex flex-col  sm:flex-row md:flex-col">
            <span className="text-lg font-semibold">Release Date:</span>
            <span className="font-semibold text-gray-400">
              {dayjs(releaseDate).format("MMM D, YYYY")}
            </span>
          </div>

          {/* Runtime */}
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

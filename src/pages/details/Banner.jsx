import React from "react";
import { useParams } from "react-router-dom";
import { useFetchTBDBQuery } from "../../api/fetchMovies";
import { generateTMDBImageUrl } from "../../utility/generateTMDBImageUrl";
import noPoster from "../../assets/no-poster.png";
import Img from "../../components/LazyLoadImg";

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
  return (
    <section className="mx-auto min-h-[700px] max-w-[1200px] pt-[90px] md:flex ">
      <div className=" px-[22px] ">
        <Img src={poster} className={"w-full rounded-2xl"} />
      </div>

      {/* Text block */}
      <div className="details__block mt-5 space-y-2 px-[22px]">
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
      </div>
    </section>
  );
};

export default Banner;

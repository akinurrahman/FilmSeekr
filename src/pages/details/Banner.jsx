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
  console.log(genres);
  return (
    <section className="mx-auto min-h-[700px] max-w-[1200px] md:flex">
      <div className=" px-[22px] pt-[90px] ">
        <Img src={poster} className={"w-full rounded-2xl"} />
      </div>
      <div className="details__block mt-5 px-[22px]">
        <h2 className="text-3xl  mb-2">{title}</h2>
        <div className=" flex items-center ">
          {genres?.map((g, index) => (
            <span
              className="mx-[2px] rounded-md bg-pink-700 px-1 text-sm"
              key={index}
            >
              {g.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;

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
  return (
    <section className="mx-auto min-h-[700px] max-w-[1200px] md:flex">
      <div className=" px-[22px] py-[90px] ">
        <Img src={poster} className={"w-full rounded-2xl"} />
      </div>
      <div className="details__block">something</div>
    </section>
  );
};

export default Banner;

import React from "react";
import { useTrendingQuery } from "../../api/fetchMovies";
import { generateTMDBImageUrl } from "../../utility/generateTMDBImageUrl";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import notPosterAvailable from "../../assets/no-poster.png";
import Img from "../../components/LazyLoadImg";

const Test = () => {
  const { data } = useTrendingQuery("day");
  return (
    <div className="grid grid-cols-4 gap-4 ">
      {data?.results?.map((currItem, index) => {
        const poster = generateTMDBImageUrl(currItem.poster_path);
        const placeholder = generateTMDBImageUrl(currItem.poster_path, "w92");
        return (
          <div key={index}>
            <h2 className="">{currItem.title}</h2>

            <Img
              className="h-[300px]"
              src={poster}
              placeholderSrc={placeholder}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Test;

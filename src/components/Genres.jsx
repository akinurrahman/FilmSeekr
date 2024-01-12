import React from "react";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  // const data = [18, 80];

  const { allGenres } = useSelector((state) => state.genres);
  const uniqueGenres = allGenres.filter(
    (obj, index, array) => array.findIndex((o) => o.id === obj.id) === index,
  );

  const filteredGenres = uniqueGenres?.filter((currElem) => {
    return data.includes(currElem.id);
  });
  console.log(filteredGenres);

  return (
    <div
      className={`relative bottom-[81px] float-end flex gap-1 pr-2 text-[12px] ${
        filteredGenres.length > 0 ? "flex-wrap" : ""
      }`}
    >
      {filteredGenres?.map((genre) => (
        <span key={genre.name} className="rounded-sm bg-pink-600 px-1">
          {genre.name}
        </span>
      ))}
    </div>
  );
};

export default Genres;

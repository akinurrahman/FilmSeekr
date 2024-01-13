import React from "react";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { allGenres } = useSelector((state) => state.genres);

  // Filtering unique genres based on their IDs
  const uniqueGenres = allGenres.filter(
    (obj, index, array) => array.findIndex((o) => o.id === obj.id) === index,
  );

  // Filtering genres based on the provided data
  const filteredGenres = uniqueGenres?.filter((currElem) => {
    return data.includes(currElem.id);
  });

  return (
    <div
      className={`  relative bottom-[81px] float-end hidden w-[60%] justify-end gap-[2px] pr-2 text-[12px] lg:flex `}
    >
      {/* Mapping through filtered genres and rendering them */}
      {filteredGenres?.map((genre) => (
        <span
          key={genre.name}
          className="line-clamp-1 w-1/2 rounded-sm bg-pink-600 pl-1"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
};

export default Genres;

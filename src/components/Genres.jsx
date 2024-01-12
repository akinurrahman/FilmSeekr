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

  return <>{filteredGenres?.map((genre) => genre.name)}</>;
};

export default Genres;

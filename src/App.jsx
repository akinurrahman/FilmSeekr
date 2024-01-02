import React from "react";
import { useTrendingMoviesQuery } from "./api/fetchTmdb";

const App = () => {
  const { data } = useTrendingMoviesQuery("/trending/movie/week");
  console.log(data)
  return <div></div>;
};

export default App;

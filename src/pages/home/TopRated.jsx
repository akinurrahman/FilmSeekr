import React, { useState } from "react";
import SwitchTabs from "../../components/SwitchTabs";
import Crousel from "../../components/Crousel";
import { useGetTopRatedQuery } from "../../api/fetchMovies";

const TopRated = () => {
  const [mediaType, setMediaType] = useState("movie");
  const { data, isLoading, error } = useGetTopRatedQuery(mediaType);

  const onTabChange = (tab) => {
    setMediaType(tab === "Movie" ? "movie" : "tv");
  };

  return (
    <section>
      <section className="mx-auto  flex w-full max-w-[1200px]   items-center justify-between px-5">
        <h2 className="text-[25px] font-[550]">Top Rated</h2>

        <SwitchTabs data={["Movie", "TV Show"]} onTabChange={onTabChange}  />
      </section>
      <Crousel data={data?.results} loading={isLoading} error={error} mediaType={mediaType} />
    </section>
  );
};

export default TopRated;

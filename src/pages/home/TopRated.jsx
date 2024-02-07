import React, { useState } from "react";
import SwitchTabs from "../../components/SwitchTabs";
import Crousel from "../../components/Crousel";
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesAndShows } from "../../api/queries";

const TopRated = () => {
  const [mediaType, setMediaType] = useState("movie");

  // API call to get top rated
  const { data, isLoading, error } = useQuery({
    queryKey: ["toprated", mediaType],
    queryFn: () => fetchMoviesAndShows(`${mediaType}/top_rated`),
    staleTime: Infinity,
  });

  const onTabChange = (tab) => {
    setMediaType(tab === "Movie" ? "movie" : "tv");
  };

  return (
    <section>
      <section className="mx-auto  flex w-full max-w-[1200px]   items-center justify-between px-5">
        <h2 className="text-[25px] font-[550]">Top Rated</h2>

        <SwitchTabs data={["Movie", "TV Show"]} onTabChange={onTabChange} />
      </section>
      <Crousel
        data={data?.results}
        loading={isLoading}
        error={error}
        mediaType={mediaType}
      />
    </section>
  );
};

export default TopRated;

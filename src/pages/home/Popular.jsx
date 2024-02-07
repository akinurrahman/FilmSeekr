import React, { useState } from "react";
import SwitchTabs from "../../components/SwitchTabs";
import Crousel from "../../components/Crousel";
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesAndShows } from "../../api/queries";

const Popular = () => {
  const [mediaType, setMediaType] = useState("movie");
  // API call to get popular movies
  const { data, isLoading, error } = useQuery({
    queryKey: ["popular", mediaType],
    queryFn: () => fetchMoviesAndShows(`${mediaType}/popular`),
    staleTime: Infinity,
  });

  const onTabChange = (tab) => {
    setMediaType(tab === "Movie" ? "movie" : "tv");
  };

  return (
    <section>
      <section className="mx-auto  flex w-full max-w-[1200px]   items-center justify-between px-5">
        <h2 className="text-[25px] font-[550]">Popular</h2>

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

export default Popular;

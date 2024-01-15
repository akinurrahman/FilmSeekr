import React, { useState } from "react";
import SwitchTabs from "../../components/SwitchTabs";
import Crousel from "../../components/Crousel";
import { useGetPopularQuery } from "../../api/fetchMovies";

const Popular = () => {
  const [mediaType, setMediaType] = useState("movie");
  const { data, isLoading, error } = useGetPopularQuery(mediaType);

  const onTabChange = (tab) => {
    setMediaType(tab === "Movie" ? "movie" : "tv");
  };

  return (
    <section>
      <section className="mx-auto  flex w-full max-w-[1200px]   items-center justify-between px-5">
        <h2 className="text-[30px] font-[550]">Popular</h2>

        <SwitchTabs data={["Movie", "TV Show"]} onTabChange={onTabChange}  />
      </section>
      <Crousel data={data?.results} loading={isLoading} error={error} mediaType={mediaType} />
    </section>
  );
};

export default Popular;

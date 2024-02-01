import React from "react";
import Crousel from "../../components/Crousel";
import { useParams } from "react-router-dom";
import { fetchMoviesAndShows } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const Similer = () => {
  const { mediaType, id } = useParams();

  // Fetch similer media using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: [`similer ${mediaType} for ${id}`],
    queryFn: () => fetchMoviesAndShows(`${mediaType}/${id}/similar`),
    staleTime: Infinity,
  });
  return (
    <section>
      <section className="mx-auto  flex w-full max-w-[1200px]   items-center justify-between px-5">
        <h2 className="text-[25px] font-[550]">
          Similer {mediaType === "movie" ? "Movies" : "TV Shows"}
        </h2>
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

export default Similer;

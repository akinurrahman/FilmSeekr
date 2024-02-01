import React from "react";
import Crousel from "../../components/Crousel";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesAndShows } from "../../api/api";

const Recommendations = () => {
  const { mediaType, id } = useParams();

  // Fetch media recommendations using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: [`${mediaType} recommandation for ${id}`],
    queryFn: () => fetchMoviesAndShows(`${mediaType}/${id}/recommendations`),
    staleTime: Infinity,
  });
  return (
    <section>
      <section className="mx-auto  flex w-full max-w-[1200px]   items-center justify-between px-5">
        <h2 className="text-[25px] font-[550]">Recommendations</h2>
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

export default Recommendations;

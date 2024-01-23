import React from "react";
import Crousel from "../../components/Crousel";
import { useFetchTBDBQuery } from "../../api/fetchMovies";
import { useParams } from "react-router-dom";

const Similer = () => {
  const { mediaType, id } = useParams();
  const { data, isLoading, error } = useFetchTBDBQuery(
    `${mediaType}/${id}/similar`,
  );
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

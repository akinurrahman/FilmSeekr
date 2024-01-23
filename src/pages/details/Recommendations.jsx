import React, { useState } from "react";
import Crousel from "../../components/Crousel";
import { useFetchTBDBQuery } from "../../api/fetchMovies";
import { useParams } from "react-router-dom";

const Recommendations = () => {
  const { mediaType, id } = useParams();
  const { data, isLoading, error } = useFetchTBDBQuery(
    `${mediaType}/${id}/recommendations`,
  );
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

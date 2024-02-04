import React from "react";
import { useParams } from "react-router-dom";
import MediaCard from "../../components/MediaCard";
import { useQuery } from "@tanstack/react-query";
import { fetchExploreMedia } from "../../api/api";

const Explore = () => {
  const { mediaType } = useParams();

  const { data: videos } = useQuery({
    queryKey: [mediaType],
    queryFn: () =>
      fetchExploreMedia(`${mediaType === "Movies" ? "movie" : "tv"}`),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-5 px-4 pt-[75px] sm:grid-cols-4 md:grid-cols-5">
      {videos?.results.map((currItem) => {
        return <MediaCard key={currItem.id} currItem={currItem} />;
      })}
    </div>
  );
};

export default Explore;

import React from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import MediaCard from "../../components/MediaCard";
import { fetchExploreMedia } from "../../api/api";

const Explore = () => {
  const { mediaType } = useParams();

  // Function to map "Movies" to "movie" and anything else to "tv"
  const getMediaTypeFromParam = (param) =>
    param === "Movies" ? "movie" : "tv";

  // Fetch data using useInfiniteQuery hook
  const { data, fetchNextPage, hasNextPage, error } = useInfiniteQuery({
    queryKey: [mediaType],
    queryFn: ({ pageParam }) =>
      fetchExploreMedia({
        mediaType: getMediaTypeFromParam(mediaType),
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Determine the next page to fetch
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Extract videos from the data and flatten the array
  const videos = data?.pages.flatMap((page) => page.results) || [];

  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {/* Display a grid of MediaCards */}
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-5 px-4 pt-[75px] sm:grid-cols-4 md:grid-cols-5">
        {!error &&
          data &&
          videos.map((currItem) => (
            // Render a MediaCard for each item in the videos array
            <MediaCard key={currItem.id} currItem={currItem} />
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default Explore;

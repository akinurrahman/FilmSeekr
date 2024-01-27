import React, { useEffect, useState } from "react";
import { useGetSearchQuery } from "../../api/fetchMovies";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaCard from "../../components/MediaCard";
import { skeletons } from "../../components/Skeleton";

const Explore = () => {
  const { mediaType } = useParams();
  console.log(mediaType);
  const [pageNo, setPageNo] = useState(1);
  const [videos, setVideos] = useState([]);
  const { data, isLoading, error } = useGetSearchQuery(
    `discover/${mediaType === "Movies" ? "movie" : "tv"}?page=${pageNo}`,
  );

  // Fetch next page
  const fetchNextPage = () => {
    setPageNo((prev) => prev + 1);
  };

  // Update videos state when data changes
  useEffect(() => {
    if (data?.results) {
      // Filter out duplicates based on some unique identifier, e.g., id
      const uniqueResults = data.results.filter((newItem) => {
        return !videos.some((existingItem) => existingItem.id === newItem.id);
      });

      setVideos((prev) => [...prev, ...uniqueResults]);
    }
  }, [data?.results]);

  useEffect(() => {
    setPageNo(1);
    setVideos([]);
    
  }, [mediaType]);

  return (
    <div>
      {isLoading && (
        <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-5 px-4 pt-[75px] sm:grid-cols-4 md:grid-cols-5">
          {skeletons}
        </div>
      )}

      {error && (
        <div className="mx-auto h-20 max-w-[1200px] px-6  py-16 text-red-500">
          Error: {error?.data?.status_message || "An error occurred"}
        </div>
      )}
      {!isLoading && !error && (
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchNextPage}
          hasMore={data?.page < data?.total_pages}
          endMessage={<p>No more videos</p>}
          className="mx-auto grid max-w-[1100px] grid-cols-2 gap-5 px-4 pt-[75px] sm:grid-cols-4 md:grid-cols-5"
        >
          {videos.map((currItem) => {
            return <MediaCard key={currItem.id} currItem={currItem} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Explore;

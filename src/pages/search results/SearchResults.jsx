import React, { useEffect, useState } from "react";
import { useGetSearchQuery } from "../../api/fetchMovies";
import { useParams } from "react-router-dom";
import { skeletons } from "../../components/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaCard from "../../components/MediaCard";

const SearchResults = () => {
  const { query } = useParams();
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const { data, isLoading, error } = useGetSearchQuery(
    `search/multi?query=${query}&page=${page}`,
  );

  // Fetch next page
  const fetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  // Update videos state when data changes
  useEffect(() => {
    if (data?.results) {
      setVideos((prev) => [...prev, ...data.results]);
    }
  }, [data?.results]);

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

export default SearchResults;

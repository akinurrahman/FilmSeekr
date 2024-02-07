import React from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaCard from "../../components/MediaCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchMoviesAndShows } from "../../api/queries";
import { skeletons } from "../../components/Skeleton";

const SearchResults = () => {
  const { query } = useParams();

  // Fetch movies and shows using Infinite Query
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ["search results", query],
      queryFn: ({ pageParam }) => searchMoviesAndShows({ query, pageParam }),
      initialPageParam: 1,
      // Function to determine the next page to fetch
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.page + 1;
        return nextPage <= lastPage.total_pages ? nextPage : undefined;
      },

      staleTime: 1000 * 60 * 5, // 5 min staletime
    });

  // Flatten the 'results' array
  const searchResults = data?.pages.map((page) => page.results).flat();

  return (
    <div>
      {/* Display loading skeletons while fetching data */}
      {isLoading && (
        <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-5 px-4 pt-[75px] sm:grid-cols-4 md:grid-cols-5">
          {skeletons}
        </div>
      )}

      {/* Display error message if there's an error */}
      {error && (
        <div className="mx-auto h-20 max-w-[1200px] px-6  py-16 text-red-500">
          Error: {error?.data?.status_message || "An error occurred"}
        </div>
      )}

      
      {/* Display search results using Infinite Scroll */}
      {!isLoading && !error && (
        <InfiniteScroll
          dataLength={searchResults?.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          scrollThreshold={0.85}
          endMessage={<p>No more videos</p>}
          className="mx-auto grid max-w-[1100px] grid-cols-2 gap-5 px-4 pt-[75px] sm:grid-cols-4 md:grid-cols-5"
        >
          {/* Display each search result as a MediaCard */}
          {searchResults.map((currItem) => (
            <MediaCard key={currItem.id} currItem={currItem} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default SearchResults;

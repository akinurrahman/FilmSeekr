import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import MediaCard from "../../components/MediaCard";
import { fetchExploreMedia } from "../../api/api";
import { useSelector } from "react-redux";
import Select from "react-select";
import { sortbyData } from "../../assets/sortByData";

const Explore = () => {
  const { mediaType } = useParams();
  const { movieGenres, tvGenres } = useSelector((state) => state.genres);
  const [genres, setGenres] = useState(null); // State for selected genres
  const [sortBy, setSortBy] = useState(null); // State for selected sorting option

  // Function to map "Movies" to "movie" and anything else to "tv"
  const getApiMediaType = (param) => (param === "Movies" ? "movie" : "tv");
  // API mediaType for use in the query
  const apiMediaType = getApiMediaType(mediaType);

  // Fetch data using useInfiniteQuery hook
  const { data, fetchNextPage, hasNextPage, error } = useInfiniteQuery({
    queryKey: [mediaType, genres, sortBy],
    queryFn: ({ pageParam }) =>
      fetchExploreMedia({
        mediaType: apiMediaType,
        pageParam,
        genres,
        sortBy,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Function to determine the next page to fetch
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Extract videos from the data and flatten the array
  const videos = data?.pages.flatMap((page) => page.results) || [];

  // Handle change in genre or sorting option
  const onChange = (selectedItems, action) => {
    if (action.name === "genres") {
      // Handle genre selection
      if (action.action === "clear") {
        setGenres(null); // Clear selected genres
      } else if (action.action === "remove-value") {
        // Remove a genre
        const removedOptionId = action.removedValue.id;
        const updatedSelectedItems = selectedItems.filter(
          (item) => item.id !== removedOptionId,
        );
        const updatedGenreIds = updatedSelectedItems.map((item) => item.id);
        const updatedGenresString = updatedGenreIds.join(",");
        setGenres(updatedGenresString);
      } else {
        // Select genres
        const selectedGenreIds = selectedItems.map((genre) => genre.id);
        const genresString = selectedGenreIds.join(",");
        setGenres(genresString);
      }
    } else {
      // Handle sorting option selection
      if (action.action === "clear") {
        setSortBy(null);
      } else {
        setSortBy(selectedItems.value);
      }
    }
  };

  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      scrollThreshold={0.85}
    >
      {/* Explore section with filters */}
      <section className="mx-auto mt-[70px] max-w-[1100px]  justify-between px-4 text-lg md:flex">
        <div>Explore {mediaType}</div>
        <div className=" my-2 gap-2 md:flex md:min-w-[500px] md:max-w-[500px]">
          {/* Select component for genres */}
          <Select
            isMulti
            name="genres"
            options={mediaType === "Movies" ? movieGenres : tvGenres}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            placeholder="Select genres"
            className="mb-2 w-full"
            classNamePrefix="react-select"
            onChange={onChange}
          />
          {/* Select component for sorting options */}
          <Select
            name="sortby"
            options={sortbyData}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            placeholder="Sort By"
            isClearable={true}
            className="w-full "
            classNamePrefix="react-select"
            onChange={onChange}
          />
        </div>
      </section>

      {/* Display a grid of MediaCards */}
      <div className="mx-auto mt-4 grid max-w-[1100px] grid-cols-2 gap-5 px-4 sm:grid-cols-4 md:grid-cols-5">
        {!error &&
          data &&
          videos.map((currItem, index) => (
            <MediaCard
              key={`${currItem.id}-${index}`}
              currItem={currItem}
              mediaType={apiMediaType}
            />
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default Explore;

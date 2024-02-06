import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import MediaCard from "../../components/MediaCard";
import { fetchExploreMedia } from "../../api/api";
import { useSelector } from "react-redux";
import Select from "react-select";

const Explore = () => {
  const { mediaType } = useParams();
  const { movieGenres, tvGenres } = useSelector((state) => state.genres);
  const [genres, setGenres] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  // Function to map "Movies" to "movie" and anything else to "tv"
  const getApiMediaType = (param) => (param === "Movies" ? "movie" : "tv");

  // API mediaType for use in the query
  const apiMediaType = getApiMediaType(mediaType);

  const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ];

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
      // Determine the next page to fetch
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Extract videos from the data and flatten the array
  const videos = data?.pages.flatMap((page) => page.results) || [];

  const onChange = (selectedItems, action) => {
    if (action.name === "genres") {
      if (action.action === "clear") {
        setGenres(null);
      } else if (action.action === "remove-value") {
        const removedOptionId = action.removedValue.id;
        const updatedSelectedItems = selectedItems.filter(
          (item) => item.id !== removedOptionId,
        );
        const updatedGenreIds = updatedSelectedItems.map((item) => item.id);
        const updatedGenresString = updatedGenreIds.join(",");
        setGenres(updatedGenresString);
      } else {
        const selectedGenreIds = selectedItems.map((genre) => genre.id);
        const genresString = selectedGenreIds.join(",");
        setGenres(genresString);
      }
    } else {
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
      <section className="mx-auto mt-[70px] grid max-w-[1100px] px-4 text-lg">
        <div>Explore {mediaType}</div>
        <div className="filter">
          <Select
            isMulti
            name="genres"
            options={mediaType === "Movies" ? movieGenres : tvGenres}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            placeholder="Select genres"
            className=""
            classNamePrefix="react-select"
            onChange={onChange}
          />
          <Select
            name="sortby"
            options={sortbyData}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            placeholder="Sort By"
            isClearable={true}
            className=""
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

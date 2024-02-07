import React, { useState } from "react";
import SwitchTabs from "../../components/SwitchTabs";
import Crousel from "../../components/Crousel";
import { fetchMoviesAndShows } from "../../api/queries";
import { useQuery } from "@tanstack/react-query";

const Trending = () => {
  const [timeWindow, setTimeWindow] = useState("day");

  // API call to get trending videos
  const {
    data: trendingData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trending", timeWindow],
    queryFn: () => fetchMoviesAndShows(`trending/all/${timeWindow}`),
    staleTime: Infinity,
  });

  const onTabChange = (tab) => {
    setTimeWindow(tab === "Day" ? "day" : "week");
  };

  return (
    <section>
      <section className="mx-auto  flex w-full max-w-[1200px]   items-center justify-between px-5">
        <h2 className="text-[25px] font-[550]">Trending</h2>

        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </section>
      <Crousel data={trendingData?.results} loading={isLoading} error={error} />
    </section>
  );
};

export default Trending;

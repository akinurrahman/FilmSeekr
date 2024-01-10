import React, { useState } from "react";
import { useTrendingQuery } from "../../api/fetchMovies";
import SwitchTabs from "../../components/SwitchTabs";
import Crousel from "../../components/Crousel";

const Trending = () => {
  const [timeWindow, setTimeWindow] = useState("day");
  const { data, isLoading, error } = useTrendingQuery(timeWindow);

  const onTabChange = (tab) => {
    setTimeWindow(tab === "Day" ? "day" : "week");
  };

  return (
    <section>
      <section className="mx-auto  flex w-full max-w-[1200px]   items-center justify-between px-5">
        <h2 className="text-[30px] font-[550]">Trending</h2>

        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </section>
      <Crousel data={data?.results} loading={isLoading} error={error} />
    </section>
  );
};

export default Trending;

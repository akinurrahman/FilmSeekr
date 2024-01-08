import React from "react";
import { useTrendingQuery } from "../../api/fetchMovies";
import SwitchTabs from "../../components/SwitchTabs";

const Trending = () => {
  const { data } = useTrendingQuery("day");

  const onTabChange = (tab) => {};
  return (
    <section>
      <section className="mx-auto  flex w-full max-w-[1200px] items-center justify-between">
        <h2 className="text-lg font-semibold">Trending</h2>
        <SwitchTabs data={["Day", "Week", "Month"]} onTabChange={onTabChange} />
      </section>
    </section>
  );
};

export default Trending;

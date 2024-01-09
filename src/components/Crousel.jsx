import React from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { generateTMDBImageUrl } from "../utility/generateTMDBImageUrl";
import posterNotFound from "../assets/no-poster.png";
import dayjs from "dayjs";

const Crousel = ({ data, loading }) => {

  return (
    <section>
      <section className="relative mx-auto w-full max-w-[1200px]">
        <BsFillArrowLeftCircleFill
          className="absolute left-8 top-[44%] hidden
        cursor-pointer text-3xl text-[#b38e8e]  md:block"
        />
        <BsFillArrowRightCircleFill
          className="absolute right-6 top-[44%] hidden
      cursor-pointer text-3xl  text-[#b38e8e]   md:block"
        />
        {!loading ? (
          <div className="crouselItems flex w-full gap-3 overflow-auto p-4">
            {data?.map((currItem, index) => {
              const poster_path = currItem?.poster_path || "";
              const poster =
                generateTMDBImageUrl(poster_path) || posterNotFound;
              return (
                <div
                  key={currItem.id + index}
                  className="min-w-[42%]  cursor-pointer sm:min-w-[22%] lg:min-w-[17%]"
                >
                  <div className="poster ">
                    <img
                      src={poster}
                      alt="poster"
                      className="rounded-xl "
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="line-clamp-1 pt-3 font-semibold lg:text-[18px]">
                      {currItem?.title || currItem?.name}
                    </div>
                    <div className="font-normal text-gray-400 ">
                      {dayjs(currItem?.release_date).format("MMM DD YYYY")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <section className="">
           loading...
          </section>
        )}
      </section>
    </section>
  );
};

export default Crousel;

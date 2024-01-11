import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleRating = ({ rating }) => {
  return (
    <div className="circleRating rounded-full bg-white p-[2px]">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
      <style jsx>
        {`
          .circleRating .CircularProgressbar-text {
            font-size: 34px;
            font-weight: 700;
            fill: black;
          }
          .circleRating .CircularProgressbar-trail {
            stroke: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default CircleRating;

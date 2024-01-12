import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className, placeholder, alt }) => {
  return (
    <LazyLoadImage
      effect="blur"
      className={className || ""}
      src={src}
      alt={alt || ""}
      placeholderSrc={placeholder || ""}
    />
  );
};

export default Img;

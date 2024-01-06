export const generateTMDBImageUrl = (imagePath, size = "original") => {
  const baseUrl = "https://image.tmdb.org/t/p/";
  return `${baseUrl}${size}/${imagePath}`;
};

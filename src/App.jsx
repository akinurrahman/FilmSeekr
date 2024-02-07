import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResults from "./pages/search results/SearchResults";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/Not Found/PageNotFound";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import {
  setAllGenres,
  setMovieGenres,
  setTvGenres,
} from "./api/slices/genresSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesAndShows } from "./api/queries";

const App = () => {
  const dispatch = useDispatch();
  // Fetch movie genres using React Query
  const { data: movieGenres } = useQuery({
    queryKey: ["genres", "movies"],
    queryFn: () => fetchMoviesAndShows(`genre/movie/list`),
    staleTime: Infinity,
  });

  // Fetch TV genres using React Query
  const { data: tvGenres } = useQuery({
    queryKey: ["genres", "tv"],
    queryFn: () => fetchMoviesAndShows(`genre/tv/list`),
    staleTime: Infinity,
  });

  // When both movieGenres and tvGenres are available, dispatch the combined genres to Redux
  useEffect(() => {
    if (movieGenres && tvGenres) {
      const allGeners = [...movieGenres.genres, ...tvGenres.genres];
      dispatch(setAllGenres(allGeners));
    }
  }, [dispatch, movieGenres, tvGenres]);

  useEffect(() => {
    if (movieGenres) {
      dispatch(setMovieGenres(movieGenres.genres));
    }
  }, [dispatch, movieGenres]);
  useEffect(() => {
    if (tvGenres) {
      dispatch(setTvGenres(tvGenres.genres));
    }
  }, [dispatch, tvGenres]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

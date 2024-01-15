import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResults from "./pages/search results/SearchResults";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/Not Found/PageNotFound";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useGetGenresQuery } from "./api/fetchMovies";
import { useDispatch } from "react-redux";
import { setAllGenres } from "./api/slices/genresSlice";
import Testing from "./Testing";

const App = () => {
  const dispatch = useDispatch();
  const { data: movieGenres } = useGetGenresQuery("movie");
  const { data: tvGenres } = useGetGenresQuery("tv");

  useEffect(() => {
    if (movieGenres && tvGenres) {
      const allGeners = [...movieGenres, ...tvGenres];
      dispatch(setAllGenres(allGeners));
    }
  }, [dispatch, movieGenres, tvGenres]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

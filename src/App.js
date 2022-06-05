import React, { useState, useEffect } from "react";


import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

{
  movies?.length > 0 ?(
    <div className="container">
      {
  movies.map((movies)=>(
    <div className="movie" key={movies.imdbID}>
    <div>
      <p>{movies.Year}</p>
    </div>

    <div>
      <img src={movies.Poster !== "N/A" ? movies.Poster : "https://via.placeholder.com/400"} alt={movies.Title} />
    </div>

    <div>
      <span>{movies.Type}</span>
      <h3>{movies.Title}</h3>
    </div>
  </div>
  ))
}
    </div>
  ) : (
    <div className="empty">
      <h2>No movies found</h2>
    </div>
  )
}


  </div>
  );
}

export default App;

// import React from "react";
import { useState, useEffect } from "react";

import MovieCard from "./MovieCard";

import "./App.css";
import SearchIcon from "./search.svg"


const API_URL = process.env.REACT_APP_OMBD_KEY;
const App = () => {

    const [searchTerm, setsearchTerm] = useState("")
    const [movies, setMovies] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies("all")
    }, []);

    return (
        <div className="app">
            <h1>Movie Search</h1>

            <div className="search">
                <input className="searchInput" type="text" placeholder="Search for movies" value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} />
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
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

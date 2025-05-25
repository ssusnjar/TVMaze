'use client';
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

//komponenta za aside filter po zanrovima i search

const genres = ["All", "Drama", "Comedy", "Action", "Horror", "Romance"];


export default function AsideFilter({ series, setSeries, search, setSearch  }) {
     
    const [selectedGenre, setSelectedGenre] = useState("All");
 
    async function handleGenreChange(e) {
    const genre = e.target.value;
    setSelectedGenre(genre);

    try {
      const res = await axios.get("https://api.tvmaze.com/shows?page=0");
      if (genre === "Svi") {
        setSeries(res.data);
      } else {
        const filtered = res.data.filter((show) =>
          show.genres.includes(genre)
        );
        setSeries(filtered);
      }
    } catch (err) {
      console.error(err);
    }
  }


  return (
     <aside className='w-60  shadow-lg p-4'>
        <input
        type="text"
        placeholder="Pretraži serije..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

        <h2 className='text-xl font-bold mb-4'>Žanr</h2>
        <nav className='space-y-2 mb-4'>
            <select
                value={selectedGenre}
                onChange={handleGenreChange}
                className="w-full p-2 border border-gray-300 rounded"
            >
            {genres.map((genre) => (
            <option key={genre} value={genre}>
                {genre}
            </option>
            ))}
            </select>
        </nav>
    </aside>
  );
}

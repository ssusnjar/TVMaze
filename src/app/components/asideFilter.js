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
      if (genre === "All") {
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
      <Link href={`/show/favorites`} className=" hover:underline">
          <svg className="w-7 h-7 mb-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
          </svg>
      </Link>
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

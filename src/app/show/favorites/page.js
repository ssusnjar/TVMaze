"use client"; 
//TODO triba refresh nakon micanja

import { useEffect, useState } from "react";
import FavoriteButton from "@/app/components/FavoriteButton";
import ShowCard from "@/app/components/showCard";

export default function Favoriti() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) throw new Error("Greška pri dohvaćanju favorita");
        const data = await res.json();
        const allShows = await fetch("https://api.tvmaze.com/shows?page=0").then((res) =>
          res.json()
        );
        const favShows = allShows.filter((show) => data.favorites.includes(show.name));
        setFavorites(favShows);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchFavorites();
  }, []);

  if (error) return <p>Greška: {error}</p>;

  return (
    <div className="max-w-[80%] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Favoriti</h1>

      {favorites.length === 0 ? (
        <p >Favoriti prazni.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((show) => (
            <div key={show.id} className="relative">
              <ShowCard show={show} />
              <div className="absolute top-2 right-2">
                <FavoriteButton name={show.name} initialSaved={true} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}




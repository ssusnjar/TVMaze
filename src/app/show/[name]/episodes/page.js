'use client';

//pozivanje async unutar useEffecta rijeseno sa https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
//TODO triba razdvojit na komponente

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Episodes({ params }) {
  const { name } = params;

  const [seasons, setSeasons] = useState([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);


  useEffect(() => {
    async function fetchSeasons() {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`);
      const data = await res.json();
      const showId = data[0]?.show.id;

      const seasonsRes = await fetch(`https://api.tvmaze.com/shows/${showId}/seasons`);
      const seasonsData = await seasonsRes.json();

      setSeasons(seasonsData);
      if (seasonsData.length > 0) {
        setSelectedSeasonId(seasonsData[0].id);
      }
    }

    fetchSeasons();
  }, [name]);

  useEffect(() => {
    if (!selectedSeasonId) return;

    async function fetchEpisodes() {
      const res = await fetch(`https://api.tvmaze.com/seasons/${selectedSeasonId}/episodes`);
      const episodesData = await res.json();
      setEpisodes(episodesData);
    }

    fetchEpisodes();
  }, [selectedSeasonId]);

  return (
    <div className="w-[80%] mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Epizode serije: {name}</h1>
      <div className="flex gap-4">
        <div className="w-[85%] bg-white rounded-2xl p-4 ">
          <div className="mb-6">
            <select
              value={selectedSeasonId || ""}
              onChange={(e) => setSelectedSeasonId(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-48"
            >
              {seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  Sezona {season.number}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {episodes.map((ep) => (
             <div
                key={ep.id}
                onClick={() => setSelectedEpisode(ep)}
                className="cursor-pointer  p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                <h2 className="text-lg font-semibold mb-1">
                    {ep.number}. {ep.name}
                </h2>
                <p className="text-sm text-gray-600">Datum: {ep.airdate}</p>
                {ep.image?.medium && (
                    <img src={ep.image.medium} alt={ep.name} className="mt-2 rounded" />
                )}
                {ep.summary && (
                    <p className="text-sm mt-2 text-gray-700 line-clamp-3" dangerouslySetInnerHTML={{ __html: ep.summary }} />
                )}
                </div>

            ))}
          </div>

          {episodes.length === 0 && (
            <p className="text-center text-gray-500 mt-8">Nema dostupnih epizoda.</p>
          )}
        </div>

        <div className='w-60 bg-white shadow-lg p-4'>
            <h2 className='text-xl font-bold mb-4'>Izbornik</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:underline"> Početna</Link>
            </li>
            <li>
              <Link href={`/show/${name}/cast`} className="text-blue-600 hover:underline">Glumci</Link>
            </li>
            <li>
              <button className="text-blue-600 hover:underline">Favoriti</button>
            </li>
          </ul>
        </div>
      </div>
      {selectedEpisode && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl w-[90%] max-w-xl shadow-lg relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
        onClick={() => setSelectedEpisode(null)}
      >
        ×
      </button>
      <h2 className="text-2xl font-bold mb-2">
        {selectedEpisode.number}. {selectedEpisode.name}
      </h2>
      <p className="text-sm text-gray-600 mb-2">Datum: {selectedEpisode.airdate}</p>
      {selectedEpisode.image?.original && (
        <img src={selectedEpisode.image.original} alt={selectedEpisode.name} className="mb-4 rounded" />
      )}
      {selectedEpisode.summary && (
        <div
          className="text-gray-700 text-sm"
          dangerouslySetInnerHTML={{ __html: selectedEpisode.summary }}
        />
      )}
    </div>
  </div>
)}
    </div>
    
  );
}

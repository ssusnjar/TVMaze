'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

//stranica kao za prikaz glumaca kao i epizode

export default function Cast({ params }) {
  const [cast, setCast] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${params.name}`);
      const data = await res.json();
      const showId = data[0]?.show.id;

      const castRes = await fetch(`https://api.tvmaze.com/shows/${showId}/cast`);
      const castData = await castRes.json();
      setCast(castData);
    }

    fetchCast();
  }, [params.name]);

  return (
    <div className="w-[80%] mx-auto flex">
      <div className="w-[85%] p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Glumci serije: {params.name}</h1>
        <div className="flex flex-wrap gap-4">
          {cast.map((item) => (
            <div
              key={item.person.id}
              className="w-[180px] cursor-pointer bg-white p-3 rounded-xl shadow hover:shadow-lg"
              onClick={() => setSelectedActor(item)}
            >
              <img
                src={item.person.image?.medium || '/placeholder.jpg'}
                alt={item.person.name}
                className="rounded mb-2 w-full h-[250px] object-cover"
              />
              <h3 className="text-md font-semibold">{item.person.name}</h3>
              <p className="text-sm text-gray-500">Uloga: {item.character.name}</p>
            </div>
          ))}
        </div>
      </div>

 

      {selectedActor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-xl shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setSelectedActor(null)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedActor.person.name}</h2>
            {selectedActor.person.image?.original && (
              <img src={selectedActor.person.image.original} alt={selectedActor.person.name} className="mb-4 rounded" />
            )}
            <p className="text-gray-600 text-sm mb-2">
              Uloga: <strong>{selectedActor.character.name}</strong>
            </p>
            {selectedActor.person.country && (
              <p className="text-gray-600 text-sm">
                Država: {selectedActor.person.country.name}
              </p>
            )}
            {selectedActor.person.birthday && (
              <p className="text-gray-600 text-sm">
                Rođen: {selectedActor.person.birthday}
              </p>
            )}
          </div>
        </div>
      )}

      <aside className='w-60 bg-white shadow-lg p-4'>
        <h2 className='text-xl font-bold mb-4'>Izbornik</h2>
          <nav className='space-y-2 mb-4'>
            <ul className="space-y-4">
              <li>
              <a href="/" className="text-blue-500 hover:underline"> Početna</a>
              </li>
              <li>
              <a href={`/show/favorites`} className="text-blue-500 hover:underline">Favoriti</a>
              </li>
            </ul>
          </nav>
        </aside>
    </div>
  );
}

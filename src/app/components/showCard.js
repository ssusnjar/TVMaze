'use client';
import Link from 'next/link';

export default function ShowCard({show}) {
  return (
    <Link href={`/show/${show.name}`}>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
        <img
            src={show.image.medium}
            alt={show.name}
            className="w-full h-[300px] object-cover"
        />
        <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{show.name}</h2>
            <p className="text-sm text-gray-600 mb-1">
                {/* //TODO odvojit zanrove zarezom */}
            <span className="font-medium text-gray-700">Genres:</span> {show.genres}
            </p>
            <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium text-gray-700">Rating:</span> {show.rating.average}
            </p>
            <div
            className="text-sm text-gray-700 mt-2 "
            dangerouslySetInnerHTML={{ __html: show.summary }}
            />
        </div>
        </div>
     </Link>
  );
}

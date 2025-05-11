'use client';
import ShowCard from "./showCard";


export default function ShowList({series}) {
  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {series.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
}

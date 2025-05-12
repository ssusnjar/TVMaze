'use client';

import { use, useEffect, useState } from "react";
import Link from "next/link";


export default  function Episodes({ params }) {
    const { name } = use(params);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [episodes, setEpisodes] = useState([]);
    const [seasons, setSeasons] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const res= await fetch(`https://api.tvmaze.com/search/shows?q=${name}`); 
            const data = await res.json();
            const showId = data[0]?.show.id;  //dohvaćaju se sve serije koje imaju isto u imenu pa koristimo samo prvu od njih

            const seasonsRes= await fetch(`https://api.tvmaze.com/shows/${showId}/seasons`);
            const seasonsData =await seasonsRes.json();
            setSeasons(seasonsData)
        }   

    fetchData();
  }, [])



    useEffect(()=>{
        async function fetchData(){
            const res= await fetch(`https://api.tvmaze.com/seasons/${selectedSeason}/episodes`);
            const data = await res.json();
            setEpisodes(data);
        }

        fetchData();
    }, [selectedSeason]);


  return (
    <div className="w-[80%] flex">
        <div className="w-[85%]"> 
            <select value={selectedSeason} onChange={(e)=>setSelectedSeason(e.target.value)}>
                {seasons.map((season)=>(
                    <option key={season.id} value={season.id}>
                        Sezona {season.number}
                    </option>
                ))}
            </select>
        </div>
        <div>
            {episodes.map((ep)=>(
                <div>
                    <h2>{ep.number} {ep.name}</h2>
                    
                </div>
            ))}
        </div>
        

    </div>
    // <div className="w-[80%] mx-auto mt-10 p-4">


    //   <div className="flex gap-4">
    //     {/* Lijeva strana – Epizode */}
    //     <div className="w-[85%] bg-white rounded-2xl p-4 shadow-md">
    //     

    //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //         {episodes.map((ep) => (
    //           <div key={ep.id} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
    //             <p className="text-sm text-gray-600">Datum: {ep.airdate}</p>
    //             {ep.image?.medium && (
    //               <img
    //                 src={ep.image.medium}
    //                 alt={ep.name}
    //                 className="mt-2 rounded"
    //               />
    //             )}
    //             {ep.summary && (
    //               <p
    //                 className="text-sm mt-2 text-gray-700"
    //                 dangerouslySetInnerHTML={{ __html: ep.summary }}
    //               />
    //             )}
    //           </div>
    //         ))}
    //       </div>

    //       {episodes.length === 0 && (
    //         <p className="text-center text-gray-500 mt-8">Nema dostupnih epizoda.</p>
    //       )}
    //     </div>


    //     <div className="w-[15%] bg-gray-100 p-4 rounded-2xl shadow-md h-fit">
    //       <h2 className="text-xl font-semibold mb-4">Izbornik</h2>
    //       <ul className="space-y-2 text-sm">
    //         <li>
    //           <Link href="/" className="text-blue-600 hover:underline">← Početna</Link>
    //         </li>
    //         {/* <li>
    //           <Link href={`/show/${name}`} className="text-blue-600 hover:underline">Detalji serije</Link>
    //         </li> */}
    //         <li>
    //           <Link href={`/show/${name}/cast`} className="text-blue-600 hover:underline">Glumci</Link>
    //         </li>
    //         <li>
    //           <button className="text-blue-600 hover:underline">★ Favorit</button>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
}

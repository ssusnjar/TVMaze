"use client";
import { useState,useEffect, useTransition } from "react";

// komponenta za dodavanje favorita s predavanja, dodana delete metoda, stil zvjezdice sa stranice:
// https://flowbite.com/docs/components/rating/

export default function FavoriteButton({ name, initialSaved = false }) {
  const [saved, setSaved] = useState(initialSaved);   
  const [isPending, startTransition] = useTransition();
 
  useEffect(() => {
    if (initialSaved) return;                         
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        if (data.favorites?.includes(name)) 
          setSaved(true);
      });
    }, [initialSaved, name]);

    // provjera je li serija vec dodana u favorite ako je na klik se brise, ako nije onda se doda
    async function toggleFavorit(){
        startTransition(async ()=>{
            const method = saved ? "DELETE" : "POST";
            const res = await fetch("/api/favorites",{
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            if (res.ok) setSaved(!saved);
        })
    }


    return (
        <button
        disabled={isPending}
        onClick={toggleFavorit}
        className="px-3 py-1"
        >
            <svg className= {`w-8 h-8 ${saved? "text-yellow-400" : "text-gray-300"}`}  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
        </button>
    );
}





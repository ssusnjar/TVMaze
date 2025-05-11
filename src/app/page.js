  'use client';
  import { useState, useEffect } from "react";
  import axios from "axios";
  import {memo} from 'react'
  import ShowList from './components/showList'

  export default function Home() {
    const [series, setSeries] = useState([]);

    useEffect(()=>{
      axios.get('https://api.tvmaze.com/shows?page=0')
      .then(res=>setSeries(res.data))
      .catch(err=>console.log(err))
    },[])

return (
  <div className="max-w-[80%] mx-auto">
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 lg:col-span-10">
        <ShowList series={series} />
      </div>

      {/* Sidebar */}
      {/* //TODO pogledat tailwind */}
      <div className="col-span-12 lg:col-span-2">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Izbornik</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="#">Filter 1</a></li>
            <li><a href="#">Filter 2</a></li>
            <li><a href="#">Omiljene serije</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

  }

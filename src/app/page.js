  'use client';
  import { useState, useEffect } from "react";
  import axios from "axios";
  import ShowList from './components/showList'
  import AsideFilter from "./components/asideFilter";

  //TODO triba na svaku stranicu dodat header ili nesto da se lako ode na home page

  export default function Home() {
    const [series, setSeries] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(()=>{
      axios.get('https://api.tvmaze.com/shows?page=0')
      .then(res=>setSeries(res.data))
      .catch(err=>console.log(err))
    },[])

    const filteredSeries = series.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
    );

return (
  <div className="max-w-[80%] mx-auto">
    <div className="grid grid-cols-12 gap-4 p-4 mt-20">
      <div className="col-span-12 lg:col-span-10">
        <ShowList series={filteredSeries} />
      </div>

      <AsideFilter series={series} setSeries={setSeries} search={search} setSearch={setSearch} />
    </div>
  </div>
);

}

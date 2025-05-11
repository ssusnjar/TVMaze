

export default async function ShowDetails({params}) {
    const { name } = await params;

    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`)


    if(!res.ok){
        throw Error("Serija nije pronađena");
        // TODO napravit not found stranicu
    }
    
    const data = await res.json();
    const show = data[0]?.show;

   return (
    <div className="flex justify-center  mt-30">
      <div className="w-[80%] flex gap-6">
        <div className="w-[85%]">
          <h1 className="text-3xl font-bold mb-6">{show.name}</h1>

          <div className="flex flex-col md:flex-row gap-6">
            {show.image?.medium && (
              <img
                src={show.image.medium}
                alt={show.name}
                className="w-full md:w-[300px] h-auto rounded-xl shadow"
              />
            )}

            <div className="flex-1 space-y-3">
              <p>
                <span className="font-semibold">Žanrovi:</span>{" "}
                {show.genres?.join(", ") || "Nepoznato"}
              </p>
              <p>
                <span className="font-semibold">Ocjena:</span>{" "}
                {show.rating?.average || "Nema ocjene"}
              </p>
              <div>
                <span className="font-semibold">Opis:</span>
                <div
                  className="text-gray-700 mt-2"
                  dangerouslySetInnerHTML={{ __html: show.summary }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[15%] bg-gray-100 p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-2">Izbornik</h2>
            <ul className="text-sm space-y-2">
                <li>
                <a href="/" className="text-blue-500 hover:underline">⬅ Natrag</a>
                </li>
                <li>
                <a href={`/show/${name}/episodes`} className="text-blue-500 hover:underline">🎞 Epizode</a>
                </li>
                <li>
                <a href={`/series/${name}/cast`} className="text-blue-500 hover:underline">👥 Glumci</a>
                </li>
                <li>
                <button className="text-blue-500 hover:underline">⭐ Dodaj u favorite</button>
                </li>
            </ul>
            </div>
      </div>
    </div>
  );
}

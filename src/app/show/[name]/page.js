import FavoriteButton from "@/app/components/FavoriteButton";
import NotFound from "./not-found";
import Link from "next/link";

export default async function ShowDetails({params}) {
    const { name } =  params;


    const res =  fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
    const favFetch = fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`, {
        cache: "no-store"
    });

    const [Res, favRes] = await Promise.all([res, favFetch]);

    if(!Res.ok){
        return <NotFound />;
    }
    
    const data = await Res.json();
    const show = data[0]?.show;
    const { favorites } = await favRes.json();
    const spremljen = favorites.includes(show.name);

   return ( 
    <div className="flex justify-center  mt-30">
      <div className="w-[80%] flex gap-6">
        <div className="w-[85%]">
            <div className="flex gap-4 mb-6">
                <h1 className="text-3xl font-bold ">{show.name}</h1>
                 <FavoriteButton name={show.name} initialSaved={spremljen}/>
            </div>


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
{/* //TODO izdvojit sidebar u zasebnu komponentu */}
        <aside className='w-60 bg-white shadow-lg p-4'>
            <h2 className='text-xl font-bold mb-4'>Izbornik</h2>
            <nav className='space-y-2 mb-4'>
                <ul className="space-y-4">
                    <li>
                    <Link href="/" className="text-blue-500 hover:underline"> Natrag</Link>
                    </li>
                    <li>
                    <Link href={`/show/${name}/episodes`} className="text-blue-500 hover:underline"> Epizode</Link>
                    </li>
                    <li>
                    <Link href={`/show/${name}/cast`} className="text-blue-500 hover:underline">Glumci</Link>
                    </li>
                    <li>
                    <Link href={`/show/favorites`} className="text-blue-500 hover:underline">Favoriti</Link>
                    </li>
                </ul>
            </nav>
        </aside>
      </div>
    </div>
  );
}

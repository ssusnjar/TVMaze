
export default async function Episodes({params}) {
    const { name } = await params;

    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`)


    if(!res.ok){
        throw Error("Serija nije pronađena");
        // TODO napravit not found stranicu
    }
    
    const data = await res.json();
    const showId = data[0]?.show.id;
    const episodesRes= await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    const episodes= await episodesRes.json()

    return (
        <div>
          {episodes && episodes.length > 0 ? (
  <div>{data[0].seasons}</div>
) : (
  <div>Nema epizoda</div>
)}
        </div>
    );
}

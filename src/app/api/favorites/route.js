
let favorites = [" "]; //demo baza
 

// funkcije za dohvat favora, postavljanje i brisanje favorita 

export async function GET() {
  return Response.json({ favorites });
}
 
export async function POST(request) {
  const body = await request.json();
  if (!body?.name)
    return Response.json({ error: "name missing" }, { status: 400 });
 
  if (!favorites.includes(body.name)) favorites.push(body.name);
 
  return Response.json({ ok: true, favorites });
}


export async function DELETE(request) {
  const body = await request.json();
  if (!body?.name)
    return Response.json({ error: "name missing" }, { status: 400 });

  //TODO je li bolje za id gledat?
  favorites = favorites.filter(name => name !== body.name);

  return Response.json({ ok: true, favorites });
}

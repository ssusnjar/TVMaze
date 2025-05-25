import Link from "next/link";

export default function NotFound() {
 return (
 <div>
 <h2>404 - Not Found</h2>
 <p>Tražena serija na postoji!</p>
 <Link href='/'>Vratite se na početnu stranicu</Link>
 </div>
 );
}

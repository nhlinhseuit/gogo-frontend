import "@/app/globals.css";
import Link from "next/link";

export default function FlightsSearch() {
  return (
    <main>
      <h1 className="h1-bold">Flights search</h1>
      <ul>
        <li className="block p-2 border border-gray-300 rounded hover:bg-gray-100 transition">
          <Link href="/find-flights/1">Flight number 1's detail</Link>
        </li>
        <li className="block p-2 border border-gray-300 rounded hover:bg-gray-100 transition">
          <Link href="/find-flights/2">Flight number 2's detail</Link>
        </li>
        <li className="block p-2 border border-gray-300 rounded hover:bg-gray-100 transition">
          <Link href="/find-flights/3">Flight number 3's detail</Link>
        </li>
      </ul>
    </main>
  );
}

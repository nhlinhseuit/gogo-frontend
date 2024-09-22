import "@/app/globals.css";
import Link from "next/link";

export default function StaysSearch() {
  return (
    <main>
      <h1 className="h1-bold">Stays search</h1>
      <li className="block p-2 border border-gray-300 rounded hover:bg-gray-100 transition">
        <Link href="/find-stays/1">Hotel number 1's detail</Link>
      </li>
      <li className="block p-2 border border-gray-300 rounded hover:bg-gray-100 transition">
        <Link href="/find-stays/2">Hotel number 2's detail</Link>
      </li>
      <li className="block p-2 border border-gray-300 rounded hover:bg-gray-100 transition">
        <Link href="/find-stays/3">Hotel number 3's detail</Link>
      </li>
    </main>
  );
}

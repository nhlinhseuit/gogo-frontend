import Link from "next/link";
import "../../globals.css";

export default function FindFlights() {
  return (
    <main className="p-4">
      <h1 className="h1-bold mt-4">Find flights page</h1>
      <button className=" mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
        <Link href="/find-flights/flights-search">Search flights</Link>
      </button>
    </main>
  );
}

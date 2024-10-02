import "@/app/globals.css";

interface FlightDetailProps {
  params: {
    flightId: string;
    flightTitle: string;
  };
}

export default function FlightDetail({ params }: FlightDetailProps) {
  return (
    <main className="p-4">
      <h1 className="h1-bold mt-4">{params.flightId}</h1>
      <h1 className="h1-bold mt-4">{params.flightTitle}</h1>
    </main>
  );
}

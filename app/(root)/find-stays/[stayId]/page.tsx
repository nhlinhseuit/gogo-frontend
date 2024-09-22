import "@/app/globals.css";

interface StayDetailProps {
  params: {
    stayId: string;
  };
}

export default function StayDetail({ params }: StayDetailProps) {
  return (
    <main className="p-4">
      <h1 className="h1-bold mt-4">{params.stayId}</h1>
    </main>
  );
}

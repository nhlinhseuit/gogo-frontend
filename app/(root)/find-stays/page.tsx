import Link from "next/link";
import "../../globals.css";
import PlaceComponent from "@/components/shared/details/findStays/PlaceComponent";
import FindHeader from "@/components/shared/details/findComponents/FindHeader";
import BookComponent from "@/components/shared/details/findComponents/BookComponent";
import SriLanka from "@/components/shared/details/findComponents/SriLanka";

export default function FindStays() {
  const MockRecentSearches = [
    {
      imgUrl:'/assets/images/Turkey.svg',
      country: 'Istanbul, Turkey',
      countPlace: 325
    },
    {
      imgUrl:'/assets/images/Australia.svg',
      country: 'Sydney, Australia',
      countPlace: 325
    },
    {
      imgUrl:'/assets/images/Azerbaijan.svg',
      country: 'Baku, Azerbaijan',
      countPlace: 325
    },
    {
      imgUrl:'/assets/images/Maldives.svg',
      country: 'Malé, Maldives',
      countPlace: 325
    },
  ]

  const MockBookHotel = [
    {
      type: 'Hotel',
      imgUrl: "/assets/images/Melbourne.svg",
      country: "Melbourne",
      description: "An amazing journey",
      price: 700,
    },
    {
      type: 'Hotel',
      imgUrl: "/assets/images/Paris.svg",
      country: "Paris",
      description: "A Paris Adventure",
      price: 600,
    },
    {
      type: 'Hotel',
      imgUrl: "/assets/images/London.svg",
      country: "London",
      description: "London eye adventure",
      price: 350,
    },
    {
      type: 'Hotel',
      imgUrl: "/assets/images/Columbia.svg",
      country: "Columbia",
      description: "Amazing streets",
      price: 700,
    },
  ];
  
  return (
    <main className="p-4">
      <div>
        <h1 className="mb-2 h2-bold tracking-normal">Your recent searches</h1>
        <div className="flex justify-between">
          {MockRecentSearches.map((item, index) => (
            <PlaceComponent
              key={index}
              imgUrl = {item.imgUrl}
              country = {item.country}
              countPlace = {item.countPlace}
            />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <FindHeader />
        <div className="mt-6 flex justify-between gap-x-4">
          {MockBookHotel.map((item, index) => (
            <BookComponent
              key={index}
              type={item.type}
              imgUrl={item.imgUrl}
              country={item.country}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <FindHeader />
        <SriLanka />
      </div>
    </main>
  );
}

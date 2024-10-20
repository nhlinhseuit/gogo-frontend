import "@/app/globals.css";
import Location from "@/components/shared/details/Location";
import Ratings from "@/components/shared/details/Ratings";
import ReviewsSection from "@/components/shared/details/ReviewsSection";
import HotelStars from "@/components/shared/details/stays/HotelStars";
import AvailableRooms from "@/components/shared/details/stays/AvailableRooms";
import Amenities from "@/components/shared/details/stays/Amentities";
import Advantage from "@/components/shared/details/stays/Advantage";

interface StayDetailProp {
  params: {
    flightId: string;
    flightTitle: string;
    stayId: string;
  };
}

export default function StayDetail({params}: StayDetailProp) {
  const mockStaysData = {
    id: params.stayId,
    name: "Hotel California",
    location: "Los Angeles, California",
    rating: 4.5,
    stars: 5,
    numberOfReviews: 100,
    price: 100,
    imageUrl: "/assets/images/flight.png",
    overview: "Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park Bosphorus Hotel Istanbul has risen from the ashes of the historic Park Hotel, which also served as Foreign Affairs Palace 120 years ago and is hosting its guests by assuming this hospitality mission. With its 452 luxurious rooms and suites, 8500 m2 SPA and fitness area, 18 meeting rooms including 4 dividable ones and 3 terraces with Bosphorus view, Istanbuls largest terrace with Bosphorus view (4500 m2) and latest technology infrastructure, CVK Park Bosphorus Hotel Istanbul is destined to be the popular attraction point of the city. Room and suite categories at various sizes with city and Bosphorus view, as well as 68 separate luxury suites, are offered to its special guests as a wide variety of selection.",
  };

  return (
    <main className="flex w-full flex-col gap-4 py-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          <span className="h2-bold">{mockStaysData.name}</span>
          <HotelStars stars={mockStaysData.stars}/>
        </div>
        <span className="h2-bold text-accent-orange">
          ${mockStaysData.price}<span className="text-sm">/night</span>
        </span>
      </div>
      <Location location={mockStaysData.location}/>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Ratings rating={mockStaysData.rating} numberOfReviews={mockStaysData.numberOfReviews}/>
        <div className="flex flex-row gap-4">
          <button><img className="rounded-md p-4 border-primary-100 border-[1px]"
                       src="/assets/icons/favorite-outlined.svg" alt="Favorite"/></button>
          <button><img className="rounded-md p-4 border-primary-100 border-[1px]" src="/assets/icons/share.svg"
                       alt="Favorite"/></button>
          <button className="rounded-md px-9 py-4 bg-primary-100">Book Now</button>
        </div>
      </div>
      <img src={mockStaysData.imageUrl} alt="Hotel"/>

      {/*TODO: Replace with modal on showing more images*/}
      <div className="flex flex-row items-center justify-between gap-4 overflow-x-auto">
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
      </div>

      <div className="my-12 flex flex-col gap-6 border-y-2 py-16">
        <span className="h2-bold">Overview</span>
        <span className="font-light">{mockStaysData.overview}</span>
        <div className="flex flex-col md:flex-row overflow-x-auto gap-4">
          <div className="flex flex-col bg-primary-100 h-36 rounded-xl p-4 min-w-40 md:flex-row">
            <div className="flex flex-col">
              <span className="h1-bold mb-auto">{mockStaysData.rating}</span>

              <span className="font-semibold">Excellent</span>
              <span>{mockStaysData.numberOfReviews} reviews</span>
            </div>
          </div>
          <Advantage name={"Free Wi-Fi"} />
          <Advantage name={"Free Wi-Fi"} />
          <Advantage name={"Free Wi-Fi"} />
        </div>

      </div>

      <AvailableRooms stayId={Number(mockStaysData.id)}/>

      <div>
        Location/Map
      </div>

      <Amenities/>
      <ReviewsSection type={"stay"} id={1}/>
    </main>
  );
}

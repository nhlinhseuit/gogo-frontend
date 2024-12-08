"use client";
import "@/app/globals.css";
import Location from "@/components/shared/details/Location";
import Ratings from "@/components/shared/details/Ratings";
import ReviewsSection from "@/components/shared/details/ReviewsSection";
import HotelStars from "@/components/shared/details/stays/HotelStars";
import AvailableRooms from "@/components/shared/details/stays/AvailableRooms";
import Amenities from "@/components/shared/details/stays/Amentities";
import Advantage from "@/components/shared/details/stays/Advantage";
import ImageModal from "@/components/shared/details/stays/ImageModal";

import {useEffect, useRef, useState} from "react";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface StayDetailProp {
  params: {
    flightTitle: string;
    stayId: string;
  };
}

export default function StayDetail({params}: StayDetailProp) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const long = 106.660172;
  const lat = 10.762622;
  const zoomLevel = 12;

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken || "";

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [long, lat],
        zoom: zoomLevel,
      });

      new mapboxgl.Marker()
        .setLngLat([long, lat])
        .addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);


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

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

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
      {/*TODO: Replace with images fetched*/}
      <div className="grid grid-cols-2 gap-2">
        <img src="/assets/images/mock-stay-image.png" alt=""
             className="aspect-square h-auto w-full rounded object-center"/>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 relative">
          <img src="/assets/images/mock-stay-image.png" alt=""
               className="aspect-square h-auto w-full rounded object-center"/>
          <img src="/assets/images/mock-stay-image.png" alt=""
               className="aspect-square h-auto w-full rounded object-center"/>
          <img src="/assets/images/mock-stay-image.png" alt=""
               className="aspect-square h-auto w-full rounded object-center"/>
          <img src="/assets/images/mock-stay-image.png" alt=""
               className="aspect-square h-auto w-full rounded object-center"/>
          <button className="hidden md:block absolute bottom-4 right-4 text-sm bg-primary-100 p-4 rounded-md"
                  onClick={openModal}>View all photos
          </button>
        </div>
      </div>

      <div className="my-12 flex flex-col gap-6 border-y-2 py-16">
        <span className="h2-bold">Overview</span>
        <span className="font-light">{mockStaysData.overview}</span>
        <div className="flex flex-col gap-4 overflow-x-auto md:flex-row">
          <div className="flex h-36 flex-col rounded-xl p-4 bg-primary-100 min-w-40 md:flex-row">
            <div className="flex flex-col">
              <span className="mb-auto h1-bold">{mockStaysData.rating}</span>

              <span className="font-semibold">Excellent</span>
              <span>{mockStaysData.numberOfReviews} reviews</span>
            </div>
          </div>
          <Advantage name={"Free Wi-Fi"}/>
          <Advantage name={"Free Wi-Fi"}/>
          <Advantage name={"Free Wi-Fi"}/>
        </div>

      </div>

      <AvailableRooms stayId={Number(mockStaysData.id)}/>

      <div className="flex flex-col gap-8 mt-8">
        <div className="flex md:flex-row flex-col md:justify-between gap-4">
          <span className="h2-bold">Location/Map</span>
          <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`} target="_blank"
             className="p-4 rounded bg-primary-100">View on Google Maps</a>
        </div>

        <div className="w-full h-80 rounded-lg" id="map-container" ref={mapContainerRef}></div>
      </div>

      <Amenities/>
      <ReviewsSection type={"stay"} id={1}/>
      {isModalOpen && <ImageModal closeModal={closeModal} stayId={Number(params.stayId)}/>}

    </main>
  );
}

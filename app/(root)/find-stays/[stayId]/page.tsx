"use client";
import "@/app/globals.css";
import LocationComponent from "@/components/shared/details/LocationComponent";
import Ratings from "@/components/shared/details/Ratings";
import ReviewsSection from "@/components/shared/details/ReviewsSection";
import HotelStars from "@/components/shared/details/stays/HotelStars";
import AvailableRooms from "@/components/shared/details/stays/AvailableRooms";
import AmenitiesComponent from "@/components/shared/details/stays/Amentities";
import Advantage from "@/components/shared/details/stays/Advantage";
import ImageModal from "@/components/shared/details/stays/ImageModal";
import {fetchStay} from "@/lib/actions/StayActions";

import {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Stay from "@/types/Stay";

interface StayDetailProp {
  params: {
    flightTitle: string;
    stayId: string;
  };
}

export default function StayDetail({params}: StayDetailProp) {
  const [stayData, setStayData] = useState<Stay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchStay(params.stayId)
      .then((data) => {
        setStayData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });

  }, [params.stayId]);

  useEffect(() => {
    if (stayData && mapContainerRef.current) {
      mapboxgl.accessToken = mapboxToken || "";

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [stayData.longitude, stayData.latitude],
        zoom: 12,
      });

      new mapboxgl.Marker().setLngLat([stayData.longitude, stayData.latitude]).addTo(mapRef.current);

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
        }
      };
    }
  }, [stayData, mapboxToken]);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  if (isLoading) {
    return <div className="py-16 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-16 text-center text-red-500">{error}</div>;
  }

  return (
    <main className="flex w-full flex-col gap-4 py-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          <span className="h2-bold">{stayData?.name}</span>
          <HotelStars stars={stayData?.star_rating || 0}/>
        </div>
        <span className="h2-bold text-accent-orange">
          {/*TODO: Replace with price*/}
          ${100}
          <span className="text-sm">/night</span>
        </span>
      </div>

      {stayData?.location && <LocationComponent location={stayData.address}/>}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/*TODO: Replace with number of reviews*/}
        <Ratings rating={stayData?.rating || 0} numberOfReviews={0}/>
        <div className="flex flex-row gap-4">
          <button>
            <img className="rounded-md p-4 border-primary-100 border-[1px]" src="/assets/icons/favorite-outlined.svg"
                 alt="Favorite"/>
          </button>
          <button>
            <img className="rounded-md p-4 border-primary-100 border-[1px]" src="/assets/icons/share.svg" alt="Share"/>
          </button>
          <button className="rounded-md px-9 py-4 bg-primary-100">Book Now</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <img src={stayData?.featured_images[0] || "/assets/images/mock-stay-image.png"} alt="Stay"
             className="aspect-square w-full rounded object-center"/>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 relative">
          {
            stayData?.featured_images.map((image, index) => (
              <img key={index} src={image || "/assets/images/mock-stay-image.png"} alt={`Stay image ${index + 1}`}
                   className="aspect-square w-full rounded object-center"/>
            ))
          }
          <button className="hidden md:block absolute bottom-4 right-4 text-sm bg-primary-100 p-4 rounded-md"
                  onClick={openModal}>
            View all photos
          </button>
        </div>
      </div>

      <div className="my-12 flex flex-col gap-6 border-y-2 py-16">
        <span className="h2-bold">Overview</span>
        <span className="font-light">{stayData?.overview}</span>
      </div>
      <div className="flex flex-row gap-8">
        <Advantage name={"Free Wi-Fi"}/>
        <Advantage name={"Free Wi-Fi"}/>
        <Advantage name={"Free Wi-Fi"}/>
      </div>

      <AvailableRooms stayId={Number(stayData?.id)}/>

      <div className="flex flex-col gap-8 mt-8">
        <div className="flex md:flex-row flex-col md:justify-between gap-4">
          <span className="h2-bold">Location/Map</span>
          <a href={`https://www.google.com/maps/search/?api=1&query=${stayData?.latitude},${stayData?.longitude}`}
             target="_blank" className="p-4 rounded bg-primary-100">
            View on Google Maps
          </a>
        </div>
        <div className="w-full h-80 rounded-lg" ref={mapContainerRef}></div>
      </div>

      <AmenitiesComponent/>
      <ReviewsSection type="stay" id={Number(stayData?.id)}/>
      {isModalOpen && <ImageModal closeModal={closeModal} stayId={Number(params.stayId)}/>}
    </main>
  );
}

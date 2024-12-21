"use client";
import "@/app/globals.css";
import LocationComponent from "@/components/shared/details/LocationComponent";
import Ratings from "@/components/shared/details/Ratings";
import ReviewsSection from "@/components/shared/details/ReviewsSection";
import HotelStars from "@/components/shared/details/stays/HotelStars";
import AvailableRooms from "@/components/shared/details/stays/AvailableRooms";
import AmenitiesComponent from "@/components/shared/details/stays/AmenitiesComponent";
import AdvantageComponent from "@/components/shared/details/stays/AdvantageComponent";
import ImageModal from "@/components/shared/details/stays/ImageModal";
import {fetchAvailableRooms, fetchStay} from "@/lib/actions/StayActions";

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
  const openModal = () => {
    if (stayData?.featured_images && stayData.featured_images.length > 0) {
      setIsModalOpen(true);
    }
  };

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
          <a href="#available-rooms" className="rounded-md px-9 py-4 bg-primary-100">Book Now</a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {stayData?.featured_images && stayData.featured_images.length > 0 ? (
          <div>
            <img src={stayData.featured_images[0].url || "/assets/images/mock-stay-image.png"} alt="Stay"
                 className="aspect-square w-full rounded object-center"/>
          </div>
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded bg-gray-200 object-center">
            <span>No Image Available</span>
          </div>
        )}

        <div className="relative grid grid-cols-2 grid-rows-2 gap-2">
          {
            stayData?.featured_images.map((image, index) => (
              (index < 4 && index > 0 && (
                  <img key={index} src={image.url || "/assets/images/mock-stay-image.png"}
                       alt={`Stay image ${index + 1}`}
                       className="aspect-square w-full rounded object-center"/>)
              )))
          }
          {stayData?.featured_images && stayData.featured_images.length > 0 && (
            <button className="absolute right-4 bottom-4 hidden rounded-md p-4 text-sm bg-primary-100 md:block"
                    onClick={openModal}>
              View all photos
            </button>)}
        </div>
      </div>

      <div className="my-12 flex flex-col gap-6 border-y-2 py-16">
        <span className="h2-bold">Overview</span>
        <span className="font-light">{stayData?.overview}</span>
      </div>
      <div className="flex flex-row gap-8">
        <AdvantageComponent name={"Free Wi-Fi"}/>
        <AdvantageComponent name={"Free Wi-Fi"}/>
        <AdvantageComponent name={"Free Wi-Fi"}/>
      </div>

      <div id="available-rooms">
        <AvailableRooms stayId={stayData!.id}/>
      </div>

      <div className="mt-8 flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <span className="h2-bold">Location/Map</span>
          <a href={`https://www.google.com/maps/search/?api=1&query=${stayData?.latitude},${stayData?.longitude}`}
             target="_blank" className="rounded p-4 bg-primary-100">
            View on Google Maps
          </a>
        </div>
        <div className="h-80 w-full rounded-lg" ref={mapContainerRef}></div>
      </div>

      <AmenitiesComponent amenities={stayData?.amenities || []}/>
      <ReviewsSection type="stay" id={Number(stayData?.id)}/>
      {isModalOpen && stayData && <ImageModal closeModal={closeModal} stayId={stayData.id}/>}
    </main>
  );
}

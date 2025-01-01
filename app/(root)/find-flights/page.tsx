"use client";

import BookFlightComponent from "@/components/shared/details/findComponents/BookComponent";
import FindHeader from "@/components/shared/details/findComponents/FindHeader";
import SriLanka from "@/components/shared/details/findComponents/SriLanka";
import { fetchLocations } from "@/lib/actions/FetchLocationsActions";
import Location from "@/types/Location";
import { imagesBookComponent } from "@/utils/util";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../globals.css";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";

export default function FindFlights() {
  const router = useRouter();

  const handleSeeAll = () => {
    router.push("/flight-places");
  };

  //TODO: locations
  const [locations, setLocations] = useState<{ data: Location[] }>({
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchLocations()
      .then((data: any) => {
        setLocations(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <main>
      <div className="mt-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="mb-2 h2-bold tracking-normal">
              Let's go places together
            </h1>
            <p className="paragraph-regular">
              Discover the latest offers and news and start planning your next
              trip with us.
            </p>
          </div>

          <div>
            <button
              onClick={handleSeeAll}
              className="py-2 px-3 border-[1px] border-primary-100 rounded-md paragraph-regular hover:bg-primary-100 transition duration-300"
            >
              See All
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Image
            src="/assets/images/Map.svg"
            alt="Map"
            width={1440}
            height={486}
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="mt-16">
        <FindHeader />

        <div className="flex justify-between gap-x-4">
          {isLoading ? (
            <BigLoadingSpinner />
          ) : locations.data.length > 0 ? (
            locations.data
              .slice(0, 4)
              .map((item, index) => (
                <BookFlightComponent
                  key={index}
                  locationName=""
                  locationId={item.id}
                  type={"Flight"}
                  imgUrl={item.imageUrl ?? imagesBookComponent[index]}
                  country={item.city}
                  description={item.description}
                />
              ))
          ) : null}
        </div>
      </div>

      <div className="mt-16">
        <FindHeader />
        <SriLanka type="Flight" />
      </div>
    </main>
  );
}

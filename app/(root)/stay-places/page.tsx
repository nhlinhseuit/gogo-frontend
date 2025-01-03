"use client";

import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import PlacesComponent from "@/components/shared/home/PlaceComponent";
import { fetchLocations } from "@/lib/actions/FetchLocationsActions";
import Location from "@/types/Location";
import {
  convertDataNavigate,
  defaultSearchStayParams,
  getRandomImgUrl
} from "@/utils/util";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
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

  const router = useRouter();

  const handleNavigateStay = (locationName: string, locationId: string) => {
    const params = defaultSearchStayParams(locationName, locationId);

    const formattedParams: Record<string, string> = convertDataNavigate(params);

    const queryString = new URLSearchParams(formattedParams).toString();
    router.push(`/find-stays/stays-search?${queryString}`);
  };

  return (
    <div>
      <div className="mt-16 flex justify-between items-center">
        <div>
          <h1 className="h1-bold tracking-normal">List of stay places</h1>
          <p className="mt-2 paragraph-medium text-gray-700 tracking-normal">
            Search Flights & Places Hire to our most popular destinations
          </p>
        </div>
      </div>

      {isLoading ? (
        <BigLoadingSpinner />
      ) : locations.data.length > 0 ? (
        <div className="flex flex-wrap justify-start gap-x-10 gap-y-6 mt-8">
          {locations.data.map((item, index) => (
            <PlacesComponent
              key={item.id}
              imgUrl={item.imageUrl ?? getRandomImgUrl(index)}
              placeTitle={`${item.city}, ${item.country}`}
              onClick={() => {
                handleNavigateStay(item.city, item.id);
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default page;

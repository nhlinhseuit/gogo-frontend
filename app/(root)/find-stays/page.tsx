"use client";

import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import BookComponent from "@/components/shared/details/findComponents/BookComponent";
import FindHeader from "@/components/shared/details/findComponents/FindHeader";
import SriLanka from "@/components/shared/details/findComponents/SriLanka";
import PlaceComponent from "@/components/shared/details/findStays/PlaceComponent";
import { fetchLocations } from "@/lib/actions/FetchLocationsActions";
import Location from "@/types/Location";
import { getRandomImgUrl, imagesBookComponent } from "@/utils/util";
import { useEffect, useState } from "react";
import "../../globals.css";

export default function FindStays() {
  const MockRecentSearches = [
    {
      imgUrl: "/assets/images/Turkey.svg",
      country: "Istanbul, Turkey",
      countPlace: 325,
    },
    {
      imgUrl: "/assets/images/Australia.svg",
      country: "Sydney, Australia",
      countPlace: 325,
    },
    {
      imgUrl: "/assets/images/Azerbaijan.svg",
      country: "Baku, Azerbaijan",
      countPlace: 325,
    },
    {
      imgUrl: "/assets/images/Maldives.svg",
      country: "Malé, Maldives",
      countPlace: 325,
    },
  ];

  const MockBookHotel = [
    {
      type: "Hotel",

      imgUrl: "/assets/images/Melbourne.svg",
      country: "Đà Nẵng",
      description: "Thành phố biển đẹp với bãi biển Mỹ Khê nổi tiếng",
      price: 60,
    },
    {
      type: "Hotel",

      imgUrl: "/assets/images/Columbia.svg",
      country: "Nha Trang",
      description: "Địa điểm du lịch biển hàng đầu với nhiều khu nghỉ dưỡng.",
      price: 1500000,
    },
    {
      type: "Hotel",

      imgUrl: "/assets/images/London.svg",
      country: "Paris",
      description: "Thủ đô của Pháp, nổi tiếng với tháp Eiffel và nghệ thuật",
      price: 800000,
    },
    {
      type: "Hotel",

      imgUrl: "/assets/images/Paris.svg",
      country: "London",
      description:
        "Thành phố nổi tiếng với lịch sử lâu đời và đa dạng văn hóa.",
      price: 700,
    },
  ];

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

  let data: string[] | null = null;

  const [recentLocations, setRecentLocations] = useState<Location[]>([]);

  useEffect(() => {
    const getRecentSearchs = () => {
      if (typeof window !== "undefined") {
        const recentLocalStorage = localStorage.getItem("recentSearchs");
        try {
          return recentLocalStorage ? JSON.parse(recentLocalStorage) : [];
        } catch (error) {
          console.error("Error parsing recentSearchs:", error);
          return [];
        }
      }
      return [];
    };

    data = getRecentSearchs();
  }, []);

  useEffect(() => {
    fetchLocations()
      .then((response: any) => {
        const locations: Location[] = response.data;

        const filteredLocations = locations.filter((item) =>
          data?.includes(item.id.toString())
        );

        setRecentLocations(filteredLocations);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  return (
    <main className="p-4">
      <div className="mt-16">
        <h1 className="mb-2 h2-bold tracking-normal">Your recent searches</h1>
        <div className="flex flex-wrap justify-start gap-10">
          {recentLocations.map((item, index) => (
            <PlaceComponent
              key={item.id}
              id={item.id}
              imgUrl={item.imageUrl ?? getRandomImgUrl(index)}
              city={item.city}
              country={item.country}
            />
          ))}
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
                <BookComponent
                  key={index}
                  locationName={item.country}
                  locationId={item.id}
                  type={"Hotel"}
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
        <SriLanka type="Hotel" />
      </div>
    </main>
  );
}

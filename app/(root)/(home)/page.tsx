"use client";

import OrderComponent from "@/components/shared/home/OrderComponent";
import PlacesComponent from "@/components/shared/home/PlaceComponent";
import ReviewsComponent from "@/components/shared/home/ReviewsComponent";
import { useRouter } from "next/navigation";
import "../../globals.css";
import { useEffect, useState } from "react";
import { fetchLocations } from "@/lib/actions/FetchLocationsActions";
import LocationType from "@/types/LocationType";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import {
  convertDataNavigate,
  defaultSearchFlightParams,
  getRandomImgUrl,
} from "@/utils/util";

export default function Home() {
  const orderData = [
    {
      id: 1,
      imgUrl: "/assets/images/Flights.svg",
      title: "Flights",
      buttonTitle: "Show Flights",
      route: "/flight-places",
    },
    {
      id: 2,
      imgUrl: "/assets/images/Hotels.svg",
      title: "Hotels",
      buttonTitle: "Show Hotels",
      route: "/stay-places",
    },
  ];

  const MockReviewsData = [
    {
      id: 1,
      reviewTitle: "A real sense of community nurtured",
      reviewContent:
        "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
      reviewStars: 5,
      reviewerName: "Olga",
      reviewerFrom: "Weave Studios - Kai Tak",
      imgUrl: "/assets/images/reviewImage.svg",
    },
    {
      id: 2,
      reviewTitle: "The facilities are superb. Clean, slick, bright",
      reviewContent:
        "“A real sense of community, nurtured” Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.View moreOlgaWeave Studios – Kai TakGoogle",
      reviewStars: 5,
      reviewerName: "Olga",
      reviewerFrom: "Weave Studios - Kai Tak",
      imgUrl: "/assets/images/reviewImage2.svg",
    },
    {
      id: 3,
      reviewTitle: "The facilities are superb. Clean, slick, bright",
      reviewContent:
        "“A real sense of community, nurtured” Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.View moreOlgaWeave Studios – Kai TakGoogle",
      reviewStars: 5,
      reviewerName: "Olga",
      reviewerFrom: "Weave Studios - Kai Tak",
      imgUrl: "/assets/images/reviewImage2.svg",
    },
    {
      id: 4,
      reviewTitle: "The facilities are superb. Clean, slick, bright",
      reviewContent:
        "“A real sense of community, nurtured” Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.View moreOlgaWeave Studios – Kai TakGoogle",
      reviewStars: 5,
      reviewerName: "Olga",
      reviewerFrom: "Weave Studios - Kai Tak",
      imgUrl: "/assets/images/reviewImage2.svg",
    },
    {
      id: 5,
      reviewTitle: "The facilities are superb. Clean, slick, bright",
      reviewContent:
        "“A real sense of community, nurtured” Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.View moreOlgaWeave Studios – Kai TakGoogle",
      reviewStars: 5,
      reviewerName: "Olga",
      reviewerFrom: "Weave Studios - Kai Tak",
      imgUrl: "/assets/images/reviewImage2.svg",
    },
  ];

  const router = useRouter();

  const handleSeeAll = () => {
    router.push("/flight-places");
  };

  // TODO: locations

  const [locations, setLocations] = useState<{ data: LocationType[] }>({
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

  const handleNavigateFlight = (locationId: string, locationName: string) => {
    const params = defaultSearchFlightParams(locationName, locationId);

    const formattedParams: Record<string, string> = convertDataNavigate(params);

    const queryString = new URLSearchParams(formattedParams).toString();
    router.push(`/find-flights/flights-search?${queryString}`);
  };

  return (
    <main>
      <div className="mt-32">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="h1-bold tracking-normal">
                Plan your perfect trip
              </h1>
              <p className="mt-2 paragraph-medium text-gray-700 tracking-normal">
                Search Flights & Places Hire to our most popular destinations
              </p>
            </div>
            <div>
              <button
                onClick={handleSeeAll}
                className="py-2 px-3 border-[1px] border-primary-100 rounded-md body-medium  hover:bg-primary-100 transition duration-300"
              >
                See more places
              </button>
            </div>
          </div>

          {isLoading ? (
            <BigLoadingSpinner />
          ) : locations.data.length > 0 ? (
            <div className="flex flex-wrap justify-start gap-x-10 gap-y-6 mt-8">
              {locations.data.splice(0, 9).map((item, index) => (
                <PlacesComponent
                  key={item.id}
                  imgUrl={item.imageUrl ?? getRandomImgUrl(index)}
                  placeTitle={`${item.city}, ${item.country}`}
                  onClick={() => {
                    handleNavigateFlight(item.id, item.city);
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-16 flex gap-x-4">
          {orderData.map((item) => (
            <OrderComponent
              key={item.id}
              imgUrl={item.imgUrl}
              title={item.title}
              buttonTitle={item.buttonTitle}
              route={item.route}
            />
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="h2-bold tracking-normal">Reviews</h1>
              <p className="mt-2 paragraph-regular">
                What people says about Golobe facilities
              </p>
            </div>
          </div>

          <div className="w-full pb-10 flex flex-nowrap gap-x-12 overflow-x-auto">
            {MockReviewsData.map((item) => (
              <ReviewsComponent
                key={item.id}
                reviewTitle={item.reviewTitle}
                reviewContent={item.reviewContent}
                reviewStars={item.reviewStars}
                reviewerName={item.reviewerName}
                reviewerFrom={item.reviewerFrom}
                imgUrl={item.imgUrl}
                initialExpanded={false}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

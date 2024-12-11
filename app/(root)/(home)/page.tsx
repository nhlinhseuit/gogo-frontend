import PlacesComponent from "@/components/shared/home/PlaceComponent";
import "../../globals.css";
import OrderComponent from "@/components/shared/home/OrderComponent";
import ReviewsComponent from "@/components/shared/home/ReviewsComponent";
import { useEffect } from "react";

export default function Home() {
  const MockPlacesData = [
    {
      id: 1,
      imgUrl: "/assets/images/Turkey.svg",
      placeTitle: "Istanbul, Turkey",
    },
    {
      id: 2,
      imgUrl: "/assets/images/Australia.svg",
      placeTitle: "Sydney, Australia",
    },
    {
      id: 3,
      imgUrl: "/assets/images/Azerbaijan.svg",
      placeTitle: "Baku, Azerbaijan",
    },
    {
      id: 4,
      imgUrl: "/assets/images/Maldives.svg",
      placeTitle: "Malé, Maldives",
    },
    {
      id: 5,
      imgUrl: "/assets/images/France.svg",
      placeTitle: "Paris, France",
    },
    {
      id: 6,
      imgUrl: "/assets/images/US.svg",
      placeTitle: "New York, US",
    },
    {
      id: 7,
      imgUrl: "/assets/images/UK.svg",
      placeTitle: "London, UK",
    },
    {
      id: 8,
      imgUrl: "/assets/images/Japan.svg",
      placeTitle: "Tokyo, Japan",
    },
    {
      id: 9,
      imgUrl: "/assets/images/UAE.svg",
      placeTitle: "Dubai, UAE",
    },
  ];

  const MockOrderData = [
    {
      id: 1,
      imgUrl: "/assets/images/Flights.svg",
      title: "Flights",
      buttonTitle: "Show Flights",
    },
    {
      id: 2,
      imgUrl: "/assets/images/Hotels.svg",
      title: "Hotels",
      buttonTitle: "Show Hotels",
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

  return (
    <main>
      <div className="mt-16">
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
              <button className="py-2 px-3 border-[1px] border-primary-100 rounded-md body-medium  hover:bg-primary-100 transition duration-300">
                See more places
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-y-6 mt-8">
            {MockPlacesData.map((item) => (
              <PlacesComponent
                key={item.id}
                imgUrl={item.imgUrl}
                placeTitle={item.placeTitle}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 flex gap-x-4">
          {MockOrderData.map((item) => (
            <OrderComponent
              key={item.id}
              imgUrl={item.imgUrl}
              title={item.title}
              buttonTitle={item.buttonTitle}
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

            <div>
              <button className="py-2 px-3 border-[1px] border-primary-100 rounded-md paragraph-regular hover:bg-primary-100 transition duration-300">
                See All
              </button>
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

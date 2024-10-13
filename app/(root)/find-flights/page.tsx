import Link from "next/link";
import "../../globals.css";
import Image from "next/image";
import BookFlightComponent from "@/components/shared/findFlight/BookFlightComponent";

export default function FindFlights() {
  const MockBookingFlight = [
    {
      imgUrl: "/assets/images/Melbourne.svg",
      country: "Melbourne",
      description: "An amazing journey",
      price: 700,
    },
    {
      imgUrl: "/assets/images/Paris.svg",
      country: "Paris",
      description: "A Paris Adventure",
      price: 600,
    },
    {
      imgUrl: "/assets/images/London.svg",
      country: "London",
      description: "London eye adventure",
      price: 350,
    },
    {
      imgUrl: "/assets/images/Columbia.svg",
      country: "Columbia",
      description: "Amazing streets",
      price: 700,
    },
  ];

  return (
    <main>
      <div className="mb-16">
        <div className="mb-4 flex justify-between items-center">
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
            <button className="py-2 px-3 border-[1px] border-primary-100 rounded-md paragraph-regular">
              See All
            </button>
          </div>
        </div>

        <div>
          <Image
            src="/assets/images/Map.svg"
            alt="Map"
            width={1440}
            height={486}
            className="rounded-lg"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-center items-center">
          <div className="flex-grow">
            <h1 className="mb-2 h2-bold tracking-normal">Fall into travel</h1>
            <p className="paragraph-regular">
              Going somewhere to celebrate this season? Whether you’re going
              home or somewhere to roam, we’ve got the travel tools to get you
              to your destination.
            </p>
          </div>

          <div className="w-[500px] text-end">
            <button className="py-2 px-3 border-[1px] border-primary-100 rounded-md paragraph-regular">
              See All
            </button>
          </div>
        </div>

        <div className="mt-8 flex gap-x-4">
          {MockBookingFlight.map((item, index) => (
            <BookFlightComponent
              key={index}
              imgUrl={item.imgUrl}
              country={item.country}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-center items-center mb-5">
          <div className="flex-grow">
            <h1 className="mb-2 h2-bold tracking-normal">Fall into travel</h1>
            <p className="paragraph-regular">
              Going somewhere to celebrate this season? Whether you’re going
              home or somewhere to roam, we’ve got the travel tools to get you
              to your destination.
            </p>
          </div>

          <div className="w-[500px] text-end">
            <button className="py-2 px-3 border-[1px] border-primary-100 rounded-md paragraph-regular">
              See All
            </button>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="relative w-[44%] h-424 bg-primary-100 p-6 rounded-2xl">
            <div className="w-full mb-6">
              <h1 className="w-[50%] title-bold">Backpacking Sri Lanka</h1>
            </div>

            <div className="absolute bg-white top-0 right-0 m-6 px-3 py-1 rounded-md text-center">
              <p className="h3-regular">From</p>
              <p className="h3-semibold">$700</p>
            </div>

            <p className="paragraph-regular mb-20">
              Traveling is a unique experience as it's the best way to unplug
              from the pushes and pulls of daily life. It helps us to forget
              about our problems, frustrations, and fears at home. During our
              journey, we experience life in different ways. We explore new
              places, cultures, cuisines, traditions, and ways of living.
            </p>

            <button className="w-full bg-white py-3 rounded-lg">
              <p className="paragraph-regular">Book Flight</p>
            </button>
          </div>

          <div className="w-[54%] flex gap-x-4">
            <div className="space-y-5">
              <Image
                src="/assets/images/Lanka-1.svg"
                alt="Lanka-1"
                width={318}
                height={200}
              />
              <Image
                src="/assets/images/Lanka-2.svg"
                alt="Lanka-2"
                width={318}
                height={200}
              />
            </div>
            <div className="space-y-5">
              <Image
                src="/assets/images/Lanka-3.svg"
                alt="Lanka-3"
                width={318}
                height={200}
              />
              <Image
                src="/assets/images/Lanka-4.svg"
                alt="Lanka-4"
                width={318}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

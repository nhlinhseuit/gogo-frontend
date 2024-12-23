import Link from "next/link";
import "../../globals.css";
import Image from "next/image";
import BookFlightComponent from "@/components/shared/details/findComponents/BookComponent";
import FindHeader from "@/components/shared/details/findComponents/FindHeader";
import SriLanka from "@/components/shared/details/findComponents/SriLanka";

export default function FindFlights() {
  const MockBookFlight = [
    {
      type: "Flight",
      imgUrl: "/assets/images/Melbourne.svg",
      country: "Đà Nẵng",
      description: "Thành phố biển đẹp với bãi biển Mỹ Khê nổi tiếng",
      price: 60,
    },
    {
      type: "Flight",
      imgUrl: "/assets/images/Columbia.svg",
      country: "Nha Trang",
      description: "Địa điểm du lịch biển hàng đầu với nhiều khu nghỉ dưỡng.",
      price: 1500000,
    },
    {
      type: "Flight",
      imgUrl: "/assets/images/London.svg",
      country: "Paris",
      description: "Thủ đô của Pháp, nổi tiếng với tháp Eiffel và nghệ thuật",
      price: 800000,
    },
    {
      type: "Flight",
      imgUrl: "/assets/images/Paris.svg",
      country: "London",
      description:
        "Thành phố nổi tiếng với lịch sử lâu đời và đa dạng văn hóa.",
      price: 700,
    },
  ];

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
            <button className="py-2 px-3 border-[1px] border-primary-100 rounded-md paragraph-regular hover:bg-primary-100 transition duration-300">
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
          {MockBookFlight.map((item, index) => (
            <BookFlightComponent
              key={index}
              type={item.type}
              imgUrl={item.imgUrl}
              country={item.country}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <FindHeader />
        <SriLanka type="Flight" />
      </div>
    </main>
  );
}

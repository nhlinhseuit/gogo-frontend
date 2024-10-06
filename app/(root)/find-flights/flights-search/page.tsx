import "@/app/globals.css";
import FindFlightFilters from "@/components/shared/details/FindFlightFilters";
import FlightsSearchTab from "@/components/shared/navbar/background-searchtab/FlightsSearchTab";
import FlightsInput from "@/components/shared/navbar/input-searchtab/FlightsInput";
import Link from "next/link";
import Image from "next/image";
import FlightsComp from "@/components/shared/details/FlightsComp";

const MockData = [
  {
    id: 1,
    rating: 4.2,
    reviews: 'Very Good',
    price: 104,
    img: '/assets/images/emirates.svg',
    countReview: 54,
  },
  {
    id: 1,
    rating: 4.2,
    reviews: 'Very Good',
    price: 104,
    img: '/assets/images/emirates.svg',
    countReview: 54,
  },
]

export default function FlightsSearch() {
  return (
    <main className='w-full'>
      <FlightsInput
        isSearchFlight
        otherClass="bg-white mt-8 px-4 py-6 rounded-lg shadow-md shadow-primary-400"
      />

      <div className="flex w-full mt-8">
        <div className="w-[30%] px-4 border-r-[1px]">
          <FindFlightFilters />
        </div>

        <div className="w-[70%] ml-2">
          <div className="flex relative h-20 mt-4 bg-white rounded-lg shadow-md shadow-primary-400 justify-start ">
            <div className="flex-1 p-4">
              <h6 className="font-semibold">Cheapest</h6>
              <p className="text-gray-400 font-thin">$99 . 2h 18m</p>
            </div>

            <div className="flex-1 px-4 my-4 border-l">
              <h6 className="font-semibold">Best</h6>
              <p className="text-gray-400 font-thin">$99 . 2h 18m</p>
            </div>

            <div className="flex-1 px-4 my-4 border-l">
              <h6 className="font-semibold">Quicked</h6>
              <p className="text-gray-400 font-thin">$99 . 2h 18m</p>
            </div>

            <div className="flex flex-1  px-4 my-4 border-l justify-center items-center">
              <Image
                src="/assets/icons/other.svg"
                alt="Other"
                width={24}
                height={24}
              />
              <h6 className="ml-2 font-regular">Other sort</h6>
            </div>
          </div>

          <div className="flex justify-between py-5">
            <div>
              <h6 className="body-semibold">
                Showing 4 of
                <span className="text-[#FF8682] ml-1">257 places</span>
              </h6>
            </div>

            <div className="flex justify-center items-center space-x-1">
              <p className="paragraph-regular">Sort by</p>
              <span className="paragraph-semibold">Recommended</span>
              <Image 
                src='/assets/icons/chevron_up.svg'
                alt="up"
                width={18}
                height={18}
              />
            </div>
          </div>

          <div>
            {MockData.map((item) => (
              <FlightsComp 
                id={item.id}
                rating={item.rating}
                reviews={item.reviews}
                img={item.img}
                countReview={item.countReview}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

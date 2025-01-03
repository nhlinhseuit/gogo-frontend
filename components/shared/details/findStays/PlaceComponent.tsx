import {
  convertDataNavigate,
  defaultSearchStayParams,
  getNumberFromId,
} from "@/utils/util";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PlaceComponent = ({
  id,
  imgUrl,
  city,
  country,
}: {
  id: string;
  imgUrl: string;
  city: string;
  country: string;
}) => {
  const router = useRouter();

  const handleNavigateStay = (locationName: string, locationId: string) => {
    const params = defaultSearchStayParams(locationName, locationId);

    const formattedParams: Record<string, string> = convertDataNavigate(params);

    const queryString = new URLSearchParams(formattedParams).toString();
    router.push(`/find-stays/stays-search?${queryString}`);
  };

  return (
    <div
      onClick={() => {
        handleNavigateStay(city, id);
      }}
      className="w-[22%] flex justify-start items-center mt-6 gap-x-4 cursor-pointer transition-transform transform hover:scale-105 duration-300"
    >
      <div>
        <Image src={imgUrl} alt={city} width={90} height={90} />
      </div>

      <div className="space-y-1">
        <h6 className="paragraph-semibold tracking-wide">
          {city}, {country}
        </h6>
        <p className="body-regular text-gray-500">
          {getNumberFromId(id)} places
        </p>
      </div>
    </div>
  );
};

export default PlaceComponent;

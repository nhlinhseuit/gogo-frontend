import CustomButton from "@/components/CustomButton";
import { useToast } from "@/hooks/use-toast";
import { fetchLocations } from "@/lib/actions/FetchLocationsActions";
import LocationType from "@/types/LocationType";
import {
  convertDataNavigate,
  formatDayFromInputToNormalDateApi,
  isDateValid,
  parseNormalDateFromSearchParamsToDayOfInput,
} from "@/utils/util";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchDropdown from "../../SearchDropdown";

const StaysInput = ({
  isSearchStay,
  otherClasses,

  destination,
  roomsParams,
  guestsParams,
  selectedCheckinDateParams,
  selectedCheckoutDateParams,
}: {
  isSearchStay?: boolean;
  otherClasses?: string;

  destination?: string;
  roomsParams?: number;
  guestsParams?: number;
  selectedCheckinDateParams?: string;
  selectedCheckoutDateParams?: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  //TODO: params passed in

  const getCheckinDateParams = () => {
    return selectedCheckinDateParams
      ? parseNormalDateFromSearchParamsToDayOfInput(selectedCheckinDateParams)
      : undefined;
  };

  const getCheckoutDateParams = () => {
    return selectedCheckoutDateParams
      ? parseNormalDateFromSearchParamsToDayOfInput(selectedCheckoutDateParams)
      : undefined;
  };

  ///

  const [locations, setLocations] = useState<{ data: LocationType[] }>({
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const [searchDestination, setSearchDestination] = useState(
    destination !== undefined ? destination : ""
  );
  const [selectedDateCheckin, setSelectedDateCheckin] = useState<
    Date | undefined
  >(getCheckinDateParams());
  const [selectedDateCheckout, setSelectedDateCheckout] = useState<
    Date | undefined
  >(getCheckoutDateParams());

  //TODO: error indicator
  const [isMissingInfo, setIsMissingInfo] = useState(-1);
  const [isUnalbleGetDestination, setIsUnalbleGetDestination] = useState(-1);
  const [isInvalidDate, setIsInvalidDate] = useState(-1);

  //TODO: number of rooms and guests
  const [rooms, setRooms] = useState(
    roomsParams !== undefined ? roomsParams : 0
  );
  const onValueIncrementRooms = () => {
    setRooms((prev) => prev + 1);
  };
  const onValueDecrementRooms = () => {
    if (rooms > 0) setRooms((prev) => prev - 1);
  };

  const [guests, setGuests] = useState(
    guestsParams !== undefined ? guestsParams : 0
  );
  const onValueIncrementGuests = () => {
    setGuests((prev) => prev + 1);
  };
  const onValueDecrementGuests = () => {
    if (guests > 0) setGuests((prev) => prev - 1);
  };

  // const getDestination = (data: Location[]) => {
  //   return data.find((item) => item.id === destination!.toString())?.city ?? "";
  // };

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

  const handleValid = () => {
    if (
      !selectedDateCheckin ||
      !selectedDateCheckout ||
      searchDestination === "" ||
      rooms === 0 ||
      guests === 0
    ) {
      toast({
        title: `Please fill in all the information!`,
        description: "Re-check the information.",
        variant: "error",
        duration: 3000,
      });
      setIsMissingInfo(0);

      return false;
    } else if (
      !locations.data.find((item) => item.city === searchDestination)?.id
    ) {
      if (isMissingInfo === 0) setIsMissingInfo(1);

      toast({
        title: `Unable to get destinations.`,
        description: "Please select a another destination!.",
        variant: "error",
        duration: 3000,
      });
      setIsUnalbleGetDestination(0);

      return false;
    } else if (
      !isDateValid(selectedDateCheckin) ||
      !isDateValid(selectedDateCheckout)
    ) {
      if (isMissingInfo === 0) setIsMissingInfo(1);
      if (isUnalbleGetDestination === 0) setIsUnalbleGetDestination(1);

      toast({
        title: `You must not choose a day in the past!`,
        description: "Please select a another checkin or checkout date.",
        variant: "error",
        duration: 3000,
      });
      setIsInvalidDate(0);

      return false;
    } else if (selectedDateCheckout < selectedDateCheckin) {
      if (isMissingInfo === 0) setIsMissingInfo(1);
      if (isUnalbleGetDestination === 0) setIsUnalbleGetDestination(1);

      toast({
        title: `Date checkout can not be earlier than date checkin!`,
        description: "Please select a another checkin or checkout date.",
        variant: "error",
        duration: 3000,
      });
      setIsInvalidDate(0);
      return false;
    }

    if (isInvalidDate === 0) setIsInvalidDate(1);

    return true;
  };

  const validateAndNavigateWithParams = ({ replace }: { replace: boolean }) => {
    if (!handleValid()) return;

    const params = {
      // page: 0,
      location_id:
        locations.data.find((item) => item.city === searchDestination)?.id ??
        "",
      location: searchDestination,
      checkin_date: selectedDateCheckin
        ? formatDayFromInputToNormalDateApi(selectedDateCheckin)
        : "",
      checkout_date: selectedDateCheckout
        ? formatDayFromInputToNormalDateApi(selectedDateCheckout)
        : "",
      rooms: rooms,
      guests: guests,

      // min_price
      // max_price
      // rating
      // type
      // page_size
    };

    if (replace) handleReplace(params);
    else handleNavigate(params);
  };

  const handleNavigate = (params: Record<string, any>) => {
    const formattedParams: Record<string, string> = convertDataNavigate(params);

    const queryString = new URLSearchParams(formattedParams).toString();
    router.push(`/find-stays/stays-search?${queryString}`);
  };
  const handleReplace = (params: Record<string, any>) => {
    const formattedParams: Record<string, string> = convertDataNavigate(params);

    const queryString = new URLSearchParams(formattedParams).toString();
    router.replace(`/find-stays/stays-search?${queryString}`);
  };

  return (
    <>
      {/* INPUT */}
      <div className={`flex flex-row gap-2 mt-6 mb-4 ${otherClasses}`}>
        <div className="relative  w-1/3 font-normal">
          <SearchDropdown
            isLoading={isLoading}
            error={error}
            isMissingInfo={isMissingInfo}
            isUnalbleGetDestination={isUnalbleGetDestination}
            label="Enter Destination"
            placeholder="Hà Nội"
            data={locations.data.map((item) => item.city)}
            value={searchDestination}
            onChange={(value) => setSearchDestination(value)}
          />
        </div>

        <div className="relative  w-1/6  font-normal">
          <SearchDropdown
            isMissingInfo={isMissingInfo}
            isInvalidDate={isInvalidDate}
            label={"Check In"}
            placeholder={`1/12/2024`}
            isChooseDate
            isStaysInput
            data={[]}
            value={
              selectedDateCheckin
                ? format(selectedDateCheckin, "dd/MM/yyyy")
                : ""
            }
            onChange={() => {}}
            dateDepart={selectedDateCheckin}
            onDateDepartChange={(date) => setSelectedDateCheckin(date)}
          />
        </div>
        <div className="relative  w-1/6  font-normal">
          <SearchDropdown
            isMissingInfo={isMissingInfo}
            isInvalidDate={isInvalidDate}
            label={"Check Out"}
            placeholder={`1/12/2024`}
            isChooseDate
            isStaysInput
            data={[]}
            value={
              selectedDateCheckout
                ? format(selectedDateCheckout, "dd/MM/yyyy")
                : ""
            }
            onChange={() => {}}
            dateDepart={selectedDateCheckout}
            onDateDepartChange={(date) => setSelectedDateCheckout(date)}
          />
        </div>

        <div className="relative  w-1/3 font-normal">
          <SearchDropdown
            isMissingInfo={isMissingInfo}
            label="Rooms - Guests"
            placeholder={`1 Room, 2 Guests`}
            data={[]}
            value={`${
              rooms != 0
                ? `${rooms} Rooms, `
                : guests != 0
                ? "___ Passengers, "
                : ""
            }${
              guests != 0 ? `${guests} Guests` : rooms != 0 ? "___ Guests" : ""
            }`}
            onChange={() => {}}
            isSelectRoomAndGuest
            rooms={rooms}
            onValueIncrementRooms={onValueIncrementRooms}
            onValueDecrementRooms={onValueDecrementRooms}
            guests={guests}
            onValueIncrementGuests={onValueIncrementGuests}
            onValueDecrementGuests={onValueDecrementGuests}
          />
        </div>

        {isSearchStay ? (
          <div
            onClick={() => {
              validateAndNavigateWithParams({ replace: true });
            }}
            className="cursor-pointer ml-3 flex px-4 bg-primary-100 rounded-md justify-center items-center text-black body.semibold"
          >
            <Image
              src="/assets/icons/searchFlight.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* ACTION */}
      {isSearchStay ? (
        <></>
      ) : (
        <div className="flex flex-row justify-end mt-4 mb-2">
          {/* <div className="flex flex-row justify-center items-center mr-4 cursor-pointer">
            <Image
              src="/assets/icons/add.svg"
              width={20}
              height={20}
              alt="add-code"
            />

            <p
              className={`
                ml-1 
                font-inter 
                body-medium
                text-dark-100
                dark:text-light-900 
                max-sm:hidden`}
            >
              Add Promo Code
            </p>
          </div> */}

          <CustomButton
            srcUrl="/assets/icons/show_places.svg"
            text="Show Places"
            onClick={() => {
              validateAndNavigateWithParams({ replace: false });
            }}
          />
        </div>
      )}
    </>
  );
};

export default StaysInput;

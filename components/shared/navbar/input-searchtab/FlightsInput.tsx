import CustomButton from "@/components/CustomButton";
import { useToast } from "@/hooks/use-toast";
import { fetchLocations } from "@/lib/actions/FetchLocationsActions";
import Location from "@/types/Location";
import {
  convertDataNavigate,
  formatDayFromInputToISODateApi,
  isDateValid,
  parseISODateFromSearchParamsToDayOfInput,
} from "@/utils/util";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchDropdown from "../../SearchDropdown";

const FlightsInput = ({
  isSearchFlight,
  otherClasses,

  departure_location,
  arrival_location,
  tripTypeParams,
  classTypeParams,
  passegersParams,
  selectedDateDepartParams,
  selectedDateReturnParams,
}: {
  isSearchFlight?: boolean;
  otherClasses?: string;

  departure_location?: string;
  arrival_location?: string;
  tripTypeParams?: boolean;
  classTypeParams?: string;
  passegersParams?: number;
  selectedDateDepartParams?: string;
  selectedDateReturnParams?: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  //TODO: params passed in

  const getTripTypeParams = () => {
    return tripTypeParams !== undefined
      ? tripTypeParams === true
        ? "Round trip"
        : "One way"
      : "One way";
  };

  const getClassTypeParams = () => {
    if (classTypeParams !== undefined) {
      if (classTypeParams?.includes("FIRST_CLASS")) return "First Class";
      if (classTypeParams?.includes("BUSINESS")) return "Business Class";
      if (classTypeParams?.includes("ECONOMY")) return "Economy Class";
    }
    return "";
  };

  const getDateDepartParams = () => {
    return selectedDateDepartParams
      ? parseISODateFromSearchParamsToDayOfInput(selectedDateDepartParams)
      : undefined;
  };

  const getDateReturnParams = () => {
    return selectedDateReturnParams
      ? parseISODateFromSearchParamsToDayOfInput(selectedDateReturnParams)
      : undefined;
  };

  ///

  const [locations, setLocations] = useState<{ data: Location[] }>({
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const [searchQueryFrom, setSearchQueryFrom] = useState(
    departure_location !== undefined ? departure_location : ""
  );
  const [searchQueryTo, setSearchQueryTo] = useState(
    arrival_location !== undefined ? arrival_location : ""
  );
  const [tripType, setTripType] = useState(getTripTypeParams());
  const [classType, setClassType] = useState(getClassTypeParams());

  //TODO: error indicator
  const [isMissingInfo, setIsMissingInfo] = useState(-1);
  const [isUnalbleGetDestination, setIsUnalbleGetDestination] = useState(-1);
  const [isInvalidDate, setIsInvalidDate] = useState(-1);

  //TODO: number of passeger
  const [passegers, setPassegers] = useState(
    passegersParams ? passegersParams : 0
  );
  const onValueIncrement = () => {
    setPassegers((prev) => prev + 1);
  };
  const onValueDecrement = () => {
    if (passegers > 0) setPassegers((prev) => prev - 1);
  };

  const [selectedDateDepart, setSelectedDateDepart] = useState<
    Date | undefined
  >(getDateDepartParams());
  const [selectedDateReturn, setSelectedDateReturn] = useState<
    Date | undefined
  >(getDateReturnParams());
  const tripTypes = ["One way", "Round trip"];
  const classTypes = ["First Class", "Business Class", "Economy Class"];

  const getClassTypeReq = () => {
    if (classType === "First Class") return "FIRST_CLASS";
    if (classType === "Business Class") return "BUSINESS";
    if (classType === "Economy Class") return "ECONOMY";
  };

  useEffect(() => {
    if (tripType === "One Way") {
      if (selectedDateDepart) setSelectedDateReturn(undefined);
    }
  }, [tripType]);

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
      !selectedDateDepart ||
      (tripType === "Round trip" && !selectedDateReturn) ||
      searchQueryFrom === "" ||
      searchQueryTo === "" ||
      classType === "" ||
      passegers === 0
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
      !locations.data.find((item) => item.city === searchQueryFrom)?.id ||
      !locations.data.find((item) => item.city === searchQueryTo)?.id
    ) {
      if (isMissingInfo === 0) setIsMissingInfo(1);

      toast({
        title: `Unable to get destinations.`,
        description: "Please select a another departure or arrival location!.",
        variant: "error",
        duration: 3000,
      });
      setIsUnalbleGetDestination(0);

      return false;
    } else if (searchQueryFrom === searchQueryTo) {
      if (isMissingInfo === 0) setIsMissingInfo(1);

      toast({
        title: `Departure and arrival location can not be the same!`,
        description: "Please select a another departure or arrival location!.",
        variant: "error",
        duration: 3000,
      });
      setIsInvalidDate(0);
      return false;
    } else if (
      !isDateValid(selectedDateDepart) ||
      (selectedDateReturn && !isDateValid(selectedDateReturn))
    ) {
      if (isMissingInfo === 0) setIsMissingInfo(1);
      if (isUnalbleGetDestination === 0) setIsUnalbleGetDestination(1);

      toast({
        title: `You must not choose a day in the past!`,
        description: "Please select a another departure or return date.",
        variant: "error",
        duration: 3000,
      });
      setIsInvalidDate(0);
      return false;
    } else if (selectedDateReturn && selectedDateReturn < selectedDateDepart) {
      if (isMissingInfo === 0) setIsMissingInfo(1);
      if (isUnalbleGetDestination === 0) setIsUnalbleGetDestination(1);

      toast({
        title: `Date return can not be earlier than date depart!`,
        description: "Please select a another departure or return date.",
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
      roundTrip: tripType === "Round trip",
      departure_location: searchQueryFrom,
      departure_location_id:
        locations.data.find((item) => item.city === searchQueryFrom)?.id ?? "",
      arrival_location: searchQueryTo,
      arrival_location_id:
        locations.data.find((item) => item.city === searchQueryTo)?.id ?? "",
      departure_time_from: selectedDateDepart
        ? formatDayFromInputToISODateApi(selectedDateDepart).startTime
        : "",
      departure_time_to: selectedDateDepart
        ? formatDayFromInputToISODateApi(selectedDateDepart).endTime
        : "",
      return_time_from: selectedDateReturn
        ? formatDayFromInputToISODateApi(selectedDateReturn).startTime
        : "",
      return_time_to: selectedDateReturn
        ? formatDayFromInputToISODateApi(selectedDateReturn).endTime
        : "",
      seat_classes: [getClassTypeReq()],
      // min_price: 0,
      // max_price: 0,
      // order_by: "CHEAPEST",
      passenger_count: passegers,
      // page_size: 10,
    };

    if (replace) handleReplace(params);
    else handleNavigate(params);
  };

  const handleNavigate = (params: Record<string, any>) => {
    const formattedParams: Record<string, string> = convertDataNavigate(params);

    const queryString = new URLSearchParams(formattedParams).toString();
    router.push(`/find-flights/flights-search?${queryString}`);
  };
  const handleReplace = (params: Record<string, any>) => {
    const formattedParams: Record<string, string> = convertDataNavigate(params);

    const queryString = new URLSearchParams(formattedParams).toString();
    router.push(`/find-flights/flights-search?${queryString}`);
  };

  return (
    <>
      {/* INPUT */}
      <div className={`flex flex-row gap-2 mt-6 mb-4 ${otherClasses}`}>
        <div className="w-[42.5%] flex gap-2 font-normal">
          <div className="flex-grow">
            <SearchDropdown
              isLoading={isLoading}
              error={error}
              isMissingInfo={isMissingInfo}
              isUnalbleGetDestination={isUnalbleGetDestination}
              label="From"
              placeholder="Hà Nội"
              data={locations.data.map((item) => item.city)}
              value={searchQueryFrom}
              onChange={(value) => setSearchQueryFrom(value)}
            />
          </div>
          <div className="flex-grow">
            <SearchDropdown
              isLoading={isLoading}
              error={error}
              isMissingInfo={isMissingInfo}
              isUnalbleGetDestination={isUnalbleGetDestination}
              label="To"
              placeholder="Hồ Chí Minh"
              data={locations.data.map((item) => item.city)}
              value={searchQueryTo}
              onChange={(value) => setSearchQueryTo(value)}
            />
          </div>
        </div>

        <div className="relative w-[14.28%]  font-normal">
          <SearchDropdown
            isMissingInfo={isMissingInfo}
            label="Trip"
            placeholder="One way"
            isSelectTrip
            data={tripTypes}
            value={tripType}
            onChange={(value) => setTripType(value)}
          />
        </div>

        <div className="relative  w-[21.61%] font-normal">
          <SearchDropdown
            isMissingInfo={isMissingInfo}
            isInvalidDate={isInvalidDate}
            label={tripType === "Round trip" ? "Depart - Return" : "Depart"}
            placeholder={
              tripType === "Round trip" ? `1/12/2024 - 5/12/2024` : "1/12/2024"
            }
            isChooseDate
            isRoundTrip={tripType === "Round trip"}
            data={[]}
            value={
              tripType !== "Round trip"
                ? selectedDateDepart
                  ? format(selectedDateDepart, "dd/MM/yyyy")
                  : ""
                : `${
                    selectedDateDepart
                      ? format(selectedDateDepart, "dd/MM/yyyy")
                      : selectedDateReturn
                      ? "__/__/____"
                      : ""
                  }${selectedDateDepart || selectedDateReturn ? " - " : ""}${
                    selectedDateReturn
                      ? format(selectedDateReturn, "dd/MM/yyyy")
                      : selectedDateDepart
                      ? "__/__/____"
                      : ""
                  }`
            }
            onChange={() => {}}
            dateDepart={selectedDateDepart}
            onDateDepartChange={(date) => setSelectedDateDepart(date)}
            dateReturn={selectedDateReturn}
            onDateReturnChange={(date) => setSelectedDateReturn(date)}
          />
        </div>

        <div className="relative  w-[21.61%] font-normal">
          <SearchDropdown
            isMissingInfo={isMissingInfo}
            label="Passenger - Class"
            placeholder={`1 Passenger, Economy`}
            // ${selectedDateDepart || selectedDateReturn ? " - " : ""}
            data={classTypes}
            value={`${
              passegers != 0
                ? `${passegers} Passengers, `
                : classType != ""
                ? "___ Passengers, "
                : ""
            }${classType != "" ? classType : passegers != 0 ? "___" : ""}`}
            onChange={(value) => setClassType(value)}
            isSelectPasseger
            passegers={passegers}
            onValueIncrement={onValueIncrement}
            onValueDecrement={onValueDecrement}
          />
        </div>

        {isSearchFlight ? (
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
        ) : null}
      </div>

      {/* ACTION */}
      {isSearchFlight ? (
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
            srcUrl="/assets/icons/show_flights.svg"
            text="Show Flights"
            onClick={() => {
              validateAndNavigateWithParams({ replace: false });
            }}
          />
        </div>
      )}
    </>
  );
};

export default FlightsInput;

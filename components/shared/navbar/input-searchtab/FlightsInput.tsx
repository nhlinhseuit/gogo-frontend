import CustomButton from "@/components/CustomButton";
import { useToast } from "@/hooks/use-toast";
import { fetchLocations } from "@/lib/actions/SearchFlight/FetchLocationsActions";
import { searchFlights } from "@/lib/actions/SearchFlight/SearchFlightActions";
import Location from "@/types/Location";
import { formatEndDayToISO, formatStartDayToISO } from "@/utils/util";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchDropdown from "../../SearchDropdown";

const FlightsInput = ({
  isSearchFlight,
  otherClass,
}: {
  isSearchFlight?: boolean;
  otherClass?: string;
}) => {
  const { toast } = useToast();

  const [locations, setLocations] = useState<{ data: Location[] }>({
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQueryFrom, setSearchQueryFrom] = useState("");
  const [searchQueryTo, setSearchQueryTo] = useState("");
  const [tripType, setTripType] = useState("One way");
  const [classType, setClassType] = useState("");

  //TODO: number of passeger
  const [passegers, setPassegers] = useState(0);
  const onValueIncrement = () => {
    setPassegers((prev) => prev + 1);
  };
  const onValueDecrement = () => {
    if (passegers > 0) setPassegers((prev) => prev - 1);
  };

  const [selectedDateDepart, setSelectedDateDepart] = useState<
    Date | undefined
  >();
  const [selectedDateReturn, setSelectedDateReturn] = useState<
    Date | undefined
  >();
  const tripTypes = ["One way", "Round trip"];
  const classTypes = ["First Class", "Business Class", "Economy Class"];

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

  if (isLoading) {
    return <div className="py-16 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-16 text-center text-red-500">{error}</div>;
  }

  const handleValid = () => {
    console.log("here");
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
      return false;
    } else if (
      !locations.data.find((item) => item.city === searchQueryFrom)?.id ||
      !locations.data.find((item) => item.city === searchQueryTo)?.id
    ) {
      toast({
        title: `Unable to get destinations.`,
        description:
          "Please select a different departure or arrival location!.",
        variant: "error",
        duration: 3000,
      });
      return false;
    }

    return true;
  };

  const searchFlightAPI = () => {
    if (!handleValid()) return;

    searchFlights({
      page: 0,
      roundTrip: tripType === "Round trip",
      departure_location_id:
        locations.data.find((item) => item.city === searchQueryFrom)?.id ?? "",
      arrival_location_id:
        locations.data.find((item) => item.city === searchQueryTo)?.id ?? "",
      departure_time_from: selectedDateDepart
        ? formatStartDayToISO(selectedDateDepart)
        : "",
      departure_time_to: selectedDateDepart
        ? formatEndDayToISO(selectedDateDepart)
        : "",
      return_time_from: selectedDateReturn
        ? formatStartDayToISO(selectedDateReturn)
        : "",
      return_time_to: selectedDateReturn
        ? formatEndDayToISO(selectedDateReturn)
        : "",
      seat_classes: [classType],
      min_price: 0,
      max_price: 0,
      order_by: "CHEAPEST",
      passenger_count: passegers,
      page_size: 10,
    })
      .then((data: any) => {
        console.log("data, data");
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {/* INPUT */}
      <div className={`flex flex-row gap-2 mt-6 mb-4 ${otherClass}`}>
        <div className="w-[42.5%] flex gap-2 font-normal">
          <div className="flex-grow">
            <SearchDropdown
              label="From"
              placeholder="Hà Nội"
              data={locations.data.map((item) => item.city)}
              value={searchQueryFrom}
              onChange={(value) => setSearchQueryFrom(value)}
            />
          </div>
          <div className="flex-grow">
            <SearchDropdown
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
            label={tripType === "Round trip" ? "Depart - Return" : "Depart"}
            placeholder={`1/12/2024 - 5/12/2024`}
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
          <div className="ml-3 flex px-4 bg-primary-100 rounded-md justify-center items-center text-black body.semibold">
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
          <div className="flex flex-row justify-center items-center mr-4 cursor-pointer">
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
          </div>

          <CustomButton
            srcUrl="/assets/icons/show_flights.svg"
            text="Show Flights"
            onClick={searchFlightAPI}
          />
        </div>
      )}
    </>
  );
};

export default FlightsInput;

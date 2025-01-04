"use client";
import "@/app/globals.css";
import FlightInformation from "@/components/shared/details/flights/FlightInformation";
import LocationComponent from "@/components/shared/details/LocationComponent";
import RatingSummaryComponent from "@/components/shared/details/RatingSummaryComponent";
import type FlightDetails from "@/types/FlightDetails";
import React, {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {fetchFlightDetails} from "@/lib/actions/FlightActions";
import type Seat from "@/types/Seat";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import ReviewsSection from "@/components/shared/details/ReviewsSection";
import Review from "@/types/Review";
import {fetchServiceReview, postReview} from "@/lib/actions/ReviewActions";
import {toast} from "@/hooks/use-toast";
import AddReviewModal from "@/components/shared/AddReviewModal";

interface FlightDetailProps {
  params: {
    flightId: string;
  };
}

const FlightDetail: React.FC<FlightDetailProps> = ({params}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const passengerCount = parseInt(searchParams.get("passenger_count") || "1", 10);
  const returnFlightId = searchParams.get("return_id");

  const [outboundFlightDetails, setOutboundFlightDetails] = useState<FlightDetails | null>(null);
  const [returnFlightDetails, setReturnFlightDetails] = useState<FlightDetails | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    size: 10,
    total: 1,
    total_page: 1,
  });
  const [activeTab, setActiveTab] = useState<'outbound' | 'return'>('outbound');
  const handleBooking = () => {
    const outboundSeats = selectedSeats.filter(seat => seat.startsWith('outbound'));
    const returnSeats = selectedSeats.filter(seat => seat.startsWith('return'));

    // Check if seats are selected for outbound flight
    if (outboundSeats.length === 0) {
      toast({
        title: "Please select seats for your outbound flight",
        variant: "error",
        duration: 3000,
      });
      return;
    }

    // If there's a return flight, check if return seats are selected
    if (returnFlightId && returnSeats.length === 0) {
      toast({
        title: "Please select seats for your return flight",
        variant: "error",
        duration: 3000,
      });
      return;
    }

    // Check if correct number of seats are selected for both flights
    if (outboundSeats.length !== passengerCount) {
      toast({
        title: `Please select ${passengerCount} seats for your outbound flight`,
        variant: "error",
        duration: 3000,
      });
      return;
    }

    if (returnFlightId && returnSeats.length !== passengerCount) {
      toast({
        title: `Please select ${passengerCount} seats for your return flight`,
        variant: "error",
        duration: 3000,
      });
      return;
    }

    // Combine all seat IDs into a single parameter
    const seatsParam = selectedSeats.map(seat => seat.split('-')[1]).join(",");

    const bookingUrl = `/find-flights/flight-booking/${params.flightId}?seat_ids=${seatsParam}&return_id=${returnFlightId}`;

    router.push(bookingUrl);
  };
  useEffect(() => {
    fetchFlightDetails(params.flightId)
      .then((data) => {
        setOutboundFlightDetails(data);
        setMainImage(data.featured_images[0]?.url || "/assets/images/bg-flights-rs.jpg");
        setLowestPrice(
          Math.min(...data.seats.map((seat) => seat.base_fare))
        );
      })
      .catch((error) => {
        console.error("Error fetching flight details:", error);
      });

    if (returnFlightId) {
      fetchFlightDetails(returnFlightId)
        .then((data) => {
          setReturnFlightDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching return flight details:", error);
        });
    }
  }, [params.flightId, returnFlightId]);

  useEffect(() => {
    const currentFlightDetails = activeTab === 'outbound' ? outboundFlightDetails : returnFlightDetails;
    if (currentFlightDetails) {
      setMainImage(currentFlightDetails.featured_images[0]?.url || "/assets/images/bg-flights-rs.jpg");
      fetchReviews(currentFlightDetails.airline.id);
    }
  }, [activeTab, outboundFlightDetails, returnFlightDetails]);

  const fetchReviews = (airlineId: string) => {
    fetchServiceReview(airlineId, paginationModel.page)
      .then((data) => {
        setReviews(data.data);
        setPaginationModel({
          page: data.page,
          size: data.size,
          total: data.total,
          total_page: data.total_page,
        });
      })
      .catch((error) => {
        // toast({
        //   title: `Error fetching reviews: ${error}`,
        //   variant: "error",
        //   duration: 3000,
        // });
        console.log(`Error fetching reviews: ${error}`);
      });
  };

  const currentFlightDetails = activeTab === 'outbound' ? outboundFlightDetails : returnFlightDetails;

  if (!currentFlightDetails) {
    return <BigLoadingSpinner/>;
  }

  const handleClassSelection = (seatClass: string) => {
    setSelectedClass(seatClass === selectedClass ? null : seatClass);
    setSelectedSeats((prevSeats) => prevSeats.filter(seat => !seat.startsWith(activeTab)));
  };

  const handleSeatSelection = (seatId: string) => {
    const seatKey = `${activeTab}-${seatId}`;
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatKey)) {
        return prevSeats.filter((id) => id !== seatKey); // Deselect seat
      }
      if (prevSeats.filter(seat => seat.startsWith(activeTab)).length < passengerCount) {
        return [...prevSeats, seatKey]; // Select seat
      }
      return prevSeats; // Do nothing if limit reached
    });
  };

  const onPostReview = (description: string, rating: number) => {
    postReview(currentFlightDetails.airline.id, description, rating, "AIRLINE")
      .then(() => {
        const fetchCurrentFlightDetails = activeTab === 'outbound' ? fetchFlightDetails(params.flightId) : fetchFlightDetails(returnFlightId!);

        fetchCurrentFlightDetails
          .then((data) => {
            if (activeTab === 'outbound') {
              setOutboundFlightDetails(data);
            } else {
              setReturnFlightDetails(data);
            }
            // Refetch the reviews for the current flight
            fetchReviews(data.airline.id);
          })
          .catch((error) => {
            console.error("Error refetching flight details:", error);
          });

        // Optionally close the review modal
        setIsAddReviewModalOpen(false);
      })
      .catch((error) => {
        toast({
          title: `Error posting review: ${error}`,
          variant: "error",
          duration: 3000,
        });
      });
  };

  const onPageChange = (page: number) => {
    setPaginationModel({
      ...paginationModel,
      page: page,
    });
    fetchReviews(currentFlightDetails.airline.id); // Fetch reviews for the new page
  };

  const filteredSeats = selectedClass
    ? currentFlightDetails.seats.filter((seat) => seat.seat_class === selectedClass)
    : currentFlightDetails.seats;

  const sortedSeats = filteredSeats.filter((seat) => seat.available).sort((a, b) =>
    a.number.localeCompare(b.number)
  );

  return (
    <main className="flex w-full flex-col gap-4 py-4">
      <div className="flex flex-row justify-between">
        <span className="h2-bold">{currentFlightDetails.airline.name} {currentFlightDetails.name}</span>
        <span className="h2-bold text-accent-orange">From ${lowestPrice}</span>
      </div>
      <LocationComponent location={currentFlightDetails.departure_airport.name}/>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <RatingSummaryComponent
          rating={currentFlightDetails.airline.rating}
          numberOfReviews={currentFlightDetails.airline.review_count}
        />
        <div className="flex flex-row gap-4">
          {/*<button>*/}
          {/*  <img*/}
          {/*    className="rounded-md p-4 border-primary-100 border-[1px]"*/}
          {/*    src="/assets/icons/favorite-outlined.svg"*/}
          {/*    alt="Favorite"*/}
          {/*  />*/}

          {/*</button>*/}
          {/*<button>*/}
          {/*  <img*/}
          {/*    className="rounded-md p-4 border-primary-100 border-[1px]"*/}
          {/*    src="/assets/icons/share.svg"*/}
          {/*    alt="Share"*/}
          {/*  />*/}
          {/*</button>*/}
          <button
            className="p-4 px-8 rounded-md bg-primary-100"
            onClick={handleBooking}
          >
            Book Now
          </button>
        </div>
      </div>
      <img
        src={mainImage ?? "/assets/images/bg-flights-rs.jpg"}
        className="w-full h-[650px] object-cover"
        alt="Flight"
      />
      <div className="flex flex-row gap-4 overflow-x-auto">
        {currentFlightDetails.featured_images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt="Flight"
            className="size-24 rounded cursor-pointer"
            onClick={() => setMainImage(image.url)}
          />
        ))}
      </div>
      <div className="flex flex-row justify-between">
        <span className="h2-bold">Seat Class</span>
      </div>
      <div className="flex flex-row gap-4">
        {Array.from(new Set(currentFlightDetails.seats.map((seat: Seat) => seat.seat_class))).map(
          (seatClass) => (
            <button
              key={seatClass}
              className={`p-2 rounded-md ${
                selectedClass === seatClass
                  ? "bg-accent-blue text-white"
                  : "bg-primary-100"
              }`}
              onClick={() => handleClassSelection(seatClass)}
            >
              {seatClass}
            </button>
          )
        )}
      </div>
      <div className="flex flex-row justify-between">
        <span className="h2-bold">Seat Selection</span>
        <span>
          {selectedSeats.filter(seat => seat.startsWith(activeTab)).length}/{passengerCount} seats selected
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {sortedSeats.map((seat) => (
          <button
            key={seat.id}
            className={`p-4 rounded-md text-center ${
              seat.available
                ? selectedSeats.includes(`${activeTab}-${seat.id}`)
                  ? "bg-accent-blue text-white"
                  : "bg-primary-100"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => seat.available && handleSeatSelection(seat.id)}
            disabled={!seat.available}
          >
            <div className="font-semibold text-xl">{seat.number}</div>
            <div className="text-sm">
              {seat.seat_class} - ${seat.base_fare + seat.service_fee}
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col rounded p-4 bg-primary-100">
        <span className="h2-bold">{currentFlightDetails.airline.name} Policies</span>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          {currentFlightDetails.airline.policies.map((policy) => (
            <div key={policy.id} className="flex flex-row items-center gap-4">
              <img src="/assets/icons/attention.svg" alt="Attention"/>
              <span className="font-light">{policy.content}</span>
            </div>
          ))}
        </div>
      </div>
      <FlightInformation flightDetails={currentFlightDetails} className="my-4"/>
      <ReviewsSection averageRating={currentFlightDetails.airline.rating}
                      reviewCount={currentFlightDetails.airline.review_count}
                      reviews={reviews} type="airline" id={Number(currentFlightDetails.airline.id)}
                      onGiveReview={() => setIsAddReviewModalOpen(true)}
                      paginationModel={paginationModel} onPageChange={onPageChange}/>

      {isAddReviewModalOpen && (
        <AddReviewModal
          isOpen={isAddReviewModalOpen}
          onClose={() => setIsAddReviewModalOpen(false)}
          onSubmit={onPostReview}
        />
      )}

      <div className="flex flex-row justify-center gap-4 mt-4">
        <button
          className={`p-2 rounded-md ${activeTab === 'outbound' ? 'bg-accent-blue text-white' : 'bg-primary-100'}`}
          onClick={() => setActiveTab('outbound')}
        >
          Outbound Flight
        </button>
        {returnFlightDetails && (
          <button
            className={`p-2 rounded-md ${activeTab === 'return' ? 'bg-accent-blue text-white' : 'bg-primary-100'}`}
            onClick={() => setActiveTab('return')}
          >
            Return Flight
          </button>
        )}
      </div>
    </main>
  );
};

export default FlightDetail;

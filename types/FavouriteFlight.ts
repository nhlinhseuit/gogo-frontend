import FlightDetails from "./FlightDetails";

interface FavouriteFlights {
    user: User;
    flight_favorites: FavouriteFlight[];
}

interface FavouriteFlight {
    id: string;
    user: User;
    outbound_flight: FlightDetails;
    return_flight: FlightDetails;
    round_trip: boolean;
}

export default FavouriteFlights
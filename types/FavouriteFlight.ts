import FavouriteFlightDetail from "./FavouriteFlightDetail";

interface FavouriteFlight {
    id: string;
    user: User;
    outbound_flight: FavouriteFlightDetail;
    return_flight: FavouriteFlightDetail;
    round_trip: boolean;
}

export default FavouriteFlight
import { deleteFavouriteAFlight } from "@/lib/actions/FavouriteFlightsActions";
import {
  deleteFavouriteAStay,
  favouriteAStay,
  fetchFavouriteStays,
} from "@/lib/actions/FavouriteStaysActions";
import FavouriteStay from "@/types/FavouriteStay";
import Stay from "@/types/Stay";
import { formatCurrency, getCurrentUser, getReviewComment } from "@/utils/util";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FavouriteStayComp = ({
  item,
  paramsRef,
  isFavorite,
}: {
  item: Stay;
  paramsRef?: any;
  isFavorite?: boolean;
}) => {
  const [error, setError] = useState<string | null>(null);

  const [favStays, setFavStays] = useState<FavouriteStay[]>();

  const currentUser = getCurrentUser();

  console.log("favStays", favStays);

  useEffect(() => {
    if (isFavorite && !currentUser) return;

    const params = {
      //TODO: XÀI TẠM THỜI
      // user_id: "2",

      user_id: currentUser.id ?? "",
      page: 0,
      size: 10,
    };

    fetchFavouriteStays(params)
      .then((data: any) => {
        setFavStays(data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const checkIsCurrentUser = () => {
    //? Middleware

    if (!currentUser) {
      const queryString = new URLSearchParams(paramsRef).toString();
      router.push(`/login?${queryString}`);
      return;
    }
  };

  const handleFavAStay = (stay_id: string) => {
    checkIsCurrentUser();

    if (getIsFavoriteItem()) {
      const result = favStays?.find((favStay) => favStay.stay.id === item.id);

      deleteFavouriteAStay(result?.id ?? "")
        .then((data: any) => {
          // setIsLoading(false);


          setFavStays(
            (prev) =>
              prev?.filter((favStay) => favStay.stay.id !== stay_id) || []
          );
        })
        .catch((error) => {
          setError(error.message);
          // setIsLoading(false);
        });
    } else {
      favouriteAStay(stay_id)
        .then((data: any) => {
          console.log("favouriteAStay data", data);

          // setIsLoading(false);
          setFavStays((prev) => [
            ...(prev || []),
            {
              id: data.data.id,
              user: currentUser,
              stay: data.data.stay,
            },
          ]);
        })
        .catch((error) => {
          setError(error.message);
          // setIsLoading(false);
        });
    }
  };

  const getIsFavoriteItem = () => {
    const result = favStays?.find((favStay) => favStay.stay.id == item.id);

    if (result != undefined) return true;
    return false;
  };

  const router = useRouter();

  const handleClickStayItem = (
    stayId: string
    // checkin: string,
    // checkout: string
  ) => {
    // router.push(
    //   `/find-stays/${stayId}?checkin=${checkin}&checkout=${checkout}`
    // );
  };

  return (
    <div className="flex w-[100%] mb-6 rounded-lg shadow-full shadow-primary-400">
      {/* <div className="w-[40%]">
        {item.featured_images.length === 0 ? null : (
          <Image
            src={item.featured_images[0].url}
            alt="Ảnh hotel"
            width={200}
            height={200}
            className="w-full rounded-tl-lg"
          />
        )}
      </div> */}

      <div className="w-[60%] p-5">
        <div className="flex justify-between">
          <div className="mb-5">
            <h2 className="h3-semibold">{item.name}</h2>

            <div className="flex mt-2">
              <Image
                src="/assets/icons/location.svg"
                alt="Anh"
                width={16}
                height={16}
              />
              <p>{item.address}</p>
            </div>

            <div className="flex items-center mt-1">
              <div className="flex gap-x-[1px]">
                {Array.from({ length: item.star_rating }, (_, index) => (
                  <Image
                    key={index}
                    src="/assets/icons/Star.svg"
                    alt="Star Icon"
                    width={16}
                    height={16}
                  />
                ))}
              </div>

              <div>
                <p className="ml-2 body-regular leading-4">
                  {item.star_rating} Star Hotel
                </p>
              </div>

              <div className="ml-8 flex">
                <Image
                  src="/assets/icons/cafe.svg"
                  alt="Aminities"
                  width={17}
                  height={17}
                  className="mr-1"
                />
                <p>
                  <span className="mr-1 paragraph-semibold">
                    {item.amenity_count}
                  </span>
                  Aminities
                </p>
              </div>
            </div>

            <div className="flex mt-2">
              <div className="flex mr-1 px-3 py-1 border border-primary-100 rounded-md justify-center items-center">
                {item.rating}
              </div>

              <div className="py-2 flex gap-2">
                <p className="font-bold">{getReviewComment(item.rating)}</p>
                <p>{item.review_count} reviews</p>
              </div>
            </div>
          </div>

          <div className="pt-1 pr-2">
            <div className="text-left body-regular">
              <p>starting from</p>
            </div>
            <div className="flex items-baseline text-[#FF8682]">
              <h1 className="h2-bold">
                ${formatCurrency({ price: item.min_price })}
              </h1>
              <h1 className="body-semibold">/night</h1>
            </div>
            <div className="text-right">
              <p>excl.tax</p>
            </div>
          </div>
        </div>
        <div className="flex w-full pt-6 border-t-[1px]">
          <div
            onClick={() => {
              handleFavAStay(item.id);
            }}
            className="flex px-3 mr-4 border border-primary-100 rounded-md justify-center items-center cursor-pointer "
          >
            {getIsFavoriteItem() ? (
              <Image
                src="/assets/icons/Heart.svg"
                alt="Anh heart"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/assets/icons/flightHeart.svg"
                alt="Anh heart"
                width={20}
                height={20}
              />
            )}
          </div>
          <button
            onClick={() => {
              handleClickStayItem(item.id);
              // handleClickStayItem(item.id, checkin, checkout);
            }}
            className="w-[90%] py-3 rounded-md bg-primary-100 font-semibold transform transition-transform hover:scale-95 duration-300"
          >
            View Place
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavouriteStayComp;

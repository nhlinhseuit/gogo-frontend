

import "../../globals.css";
import FavouriteComp from "@/components/shared/details/FavouriteComp";

const MockData = [
  {
    id: 1,
    img: '/assets/images/favourite.svg',
    title: 'Eresin Hotels - Boutique Class',
    address: 'Chiet Giang, Trung Quoc',
    star:5,
    aminities: '20+',
    rating: 4.2,
    review: 'Very Good',
    countReview: 371,
    price: 240
  },

  {
    id: 2,
    img: '/assets/images/favourite.svg',
    title: 'Eresin Hotels - Boutique Class',
    address: 'Chiet Giang, Trung Quoc',
    star:5,
    aminities: '20+',
    rating: 4.2,
    review: 'Very Good',
    countReview: 371,
    price: 240
  },
  {
    id: 3,
    img: '/assets/images/favourite.svg',
    title: 'Eresin Hotels - Boutique Class',
    address: 'Chiet Giang, Trung Quoc',
    star:5,
    aminities: '20+',
    rating: 4.2,
    review: 'Very Good',
    countReview: 371,
    price: 240
  },
]

export default function Favourites() {
  return (
    <main>
      <h1 className="h1-bold mt-8">Favourites</h1>
      <div className="flex relative h-20 mt-4 bg-white rounded-lg shadow-md shadow-primary-400 justify-start ">
        <div className="flex-1 p-4">
          <h6 className="font-semibold">Flights</h6>
          <p className="text-gray-400 font-thin">2 marked</p>
        </div>

        <div className="flex-1 px-4 my-4 border-l">
          <h6 className="font-semibold">Places</h6>
          <p className="text-gray-400 font-thin">3 marked</p>
        </div>
      </div>

      <div className="h-400 mt-8">
          {MockData.map((item) => (
            <FavouriteComp 
            id = {item.id}
            img = {item.img}
            title = {item.title}
            address = {item.address}
            star = {item.star}
            aminities = {item.aminities}
            rating = {item.rating}
            review = {item.review}
            countReview = {item.countReview}
            price = {item.price}
            />
          ))}
        </div>
    </main>
  );
}


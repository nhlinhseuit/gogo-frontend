import "@/app/globals.css";
import React, {useState} from "react";

interface ImageModalProps {
  stayId: number;
  closeModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = (props) => {
  // TODO: fetch images and set them in proper state
  const [mainImageSrc, setMainImageSrc] = useState("/assets/images/mock-stay-image.png");

  const switchImage = (src: string) => {
    setMainImageSrc(src);
  }


  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center overflow-auto justify-center bg-gray-600 bg-opacity-50 p-8">
      <div className="flex w-3/4 items-center flex-col mt-16 gap-8 rounded-lg bg-white p-8">
        <img
          className="object-contain h-[60vh] rounded-lg"
          src={mainImageSrc}
          alt="Stay"
        />



        {/* TODO: Replace with images fetched */}
        <div className="flex h-fit flex-row gap-4 overflow-x-auto">
          {[
            "/assets/images/flight.png",
            "/assets/images/flight-mock-image00001.jpg",
            "/assets/images/mock-stay-image.png",
            "/assets/images/mock-stay-image.png",
            "/assets/images/mock-stay-image.png",
            "/assets/images/mock-stay-image.png",
            "/assets/images/mock-stay-image.png",
            "/assets/images/mock-stay-image.png",
            "/assets/images/mock-stay-image.png","/assets/images/mock-stay-image.png","/assets/images/mock-stay-image.png","/assets/images/mock-stay-image.png",
            "/assets/images/mock-stay-image.png","/assets/images/mock-stay-image.png","/assets/images/mock-stay-image.png","/assets/images/mock-stay-image.png",
          ].map((src, index) => (
            <img
              key={index}
              className="cursor-pointer rounded size-24"
              src={src}
              alt="Stay"
              onClick={() => switchImage(src)} // Update the main image on click
            />
          ))}
        </div>
      </div>
      <button className="mt-4 rounded px-4 py-2 bg-primary-100" onClick={props.closeModal}>Close</button>
    </div>
  );
}

export default ImageModal;

import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import Image from "@/types/Image";
import {fetchStay} from "@/lib/actions/StayActions";
import Stay from "@/types/Stay";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";

interface ImageModalProps {
  stayId: string;
  closeModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = (props) => {
  const [mainImageSrc, setMainImageSrc] = useState<string>("");
  const [stay, setStay] = useState<Stay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetchStay(props.stayId).then((data) => {
      setStay(data);
      setMainImageSrc(data.featured_images[0].url);
      setIsLoading(false);
    }).catch((error) => {
      console.error('Error fetching stay:', error);
      setIsLoading(false);
    })
  }, []);

  const switchImage = (src: string) => {
    setMainImageSrc(src);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-600 bg-opacity-50">
        <BigLoadingSpinner/>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center overflow-auto justify-center bg-gray-600 bg-opacity-50 p-8">
      <div className="flex w-3/4 items-center flex-col mt-16 gap-8 rounded-lg bg-white p-8">
        {mainImageSrc ? (
          <img className="object-contain h-[60vh] rounded-lg" src={mainImageSrc} alt="Stay" />
        ) : (
          <span>No main image available</span>
        )}
        <div className="flex h-fit flex-row gap-4 overflow-x-auto">
          {stay?.featured_images && stay?.featured_images.length > 0 ? (
            stay?.featured_images.map((image: Image, index: number) => (
              <img
                key={index}
                className="cursor-pointer rounded size-24"
                src={image.url}
                alt={`Stay image ${index + 1}`}
                onClick={() => switchImage(image.url)}
              />
            ))
          ) : (
            <span>No images available</span>
          )}
        </div>
      </div>
      <button className="mt-4 rounded px-4 py-2 bg-primary-100" onClick={props.closeModal}>
        Close
      </button>
    </div>
  );
};

export default ImageModal;

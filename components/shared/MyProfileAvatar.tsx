import Image from "next/image";
import React from "react";

const MyProfileAvatar = ({ img }: { img: string }) => {
  return (
    <div
      className="cursor-pointer"
      style={{
        borderRadius: "50%",
        overflow: "hidden",
        width: "40px",
        height: "40px",
        position: "relative",
        border: "1px solid #8dd3bb",
      }}
    >
      <Image src={img} alt="avatar" layout="fill" objectFit="cover" />
    </div>
  );
};

export default MyProfileAvatar;

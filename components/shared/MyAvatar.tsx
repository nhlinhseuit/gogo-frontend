import Image from "next/image";
import React from "react";

const MyAvatar = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Avatar Container */}
      <div
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          width: "220px",
          height: "220px",
          position: "relative",
          border: "5px solid #8dd3bb",
        }}
      >
        <Image
          src={"/assets/images/avatar.JPG"}
          alt="avatar"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Edit Icon */}
      <div
        className="cursor-pointer absolute bottom-4 right-4 w-10 h-10 bg-[#8dd3bb] border-white border-[3px] rounded-full flex items-center justify-center shadow-lg"
        style={{
          transform: "translate(0%, 0%)",
          zIndex: 10,
        }}
      >
        <Image
          src={`/assets/icons/edit-profile.svg`}
          width={16}
          height={16}
          alt="Edit"
        />
      </div>
    </div>
  );
};

export default MyAvatar;

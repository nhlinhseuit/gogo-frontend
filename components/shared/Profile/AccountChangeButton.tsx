import Image from "next/image";
import React from "react";

const AccountChangeButton = () => {
  return (
    <div className="cursor-pointer border border-[#8dd3bb] flex gap-2 items-center py-2 px-3 rounded-sm">
      <Image
        src={`/assets/icons/edit-profile.svg`}
        width={18}
        height={18}
        alt="Favourite"
      />
      <p className="text-[13px] font-medium leading-[18.2px]">Change</p>
    </div>
  );
};

export default AccountChangeButton;

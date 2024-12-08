import Image from "next/image";
import React from "react";

const Reccomended = () => {
  return (
    <div className="flex justify-between py-5">
      <div>
        <h6 className="body-semibold">
          Showing 4 of
          <span className="text-[#FF8682] ml-1">257 places</span>
        </h6>
      </div>

      <div className="flex justify-center items-center space-x-1">
        <p className="paragraph-regular">Sort by</p>
        <span className="paragraph-semibold">Recommended</span>
        <button>
          <Image
            src="/assets/icons/chevron_up.svg"
            alt="up"
            width={18}
            height={18}
          />
        </button>
      </div>
    </div>
  );
};

export default Reccomended;

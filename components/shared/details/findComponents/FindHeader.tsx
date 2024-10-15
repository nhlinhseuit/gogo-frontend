import React from "react";

const FindHeader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex-grow">
        <h1 className="mb-2 h2-bold tracking-normal">Fall into travel</h1>
        <p className="paragraph-regular">
          Going somewhere to celebrate this season? Whether you’re going home or
          somewhere to roam, we’ve got the travel tools to get you to your
          destination.
        </p>
      </div>

      <div className="w-[500px] text-end">
        <button className="py-2 px-3 border-[1px] border-primary-100 rounded-md paragraph-regular">
          See All
        </button>
      </div>
    </div>
  );
};

export default FindHeader;

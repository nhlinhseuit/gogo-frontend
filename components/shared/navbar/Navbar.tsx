"use client";

import SearchTab from "@/components/SearchTab";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();
  const indicatorClass =
    "mt-6 bg-primary-100 h-1 absolute z-100 w-20 bottom-0 mt-6 h-1 absolute z-100 w-20 bottom-0";

  console.log(pathName === "/");

  return (
    <div className="relative">
      <nav
        className={`
          flex-between
          shadow-md
          fixed z-50 w-full gap-5 px-6 py-6
          ${pathName === "/" ? "bg-transparent" : "bg-white"}
          dark:shadow-none sm:px-12
        `}
      >
        {pathName === "/" ? (
          <div className="absolute top-0 left-0 right-0 -z-10 p-2">
            <Image
              src={"/assets/images/background.svg"}
              alt="DevFlow"
              width={0}
              height={0}
              sizes="100vw"
              className="object-cover" // Image nằm phía sau
              style={{ width: "100%", height: "60vh", borderRadius: "18px" }}
            />
            <div
              className="absolute inset-0  left-0 right-0 justify-center items-center flex flex-col" // Thêm lớp này để căn giữa
            >
              <p
                className="
            font-inter 
            title-semibold 
            text-white
            dark:text-light-900 
            max-sm:hidden"
              >
                Helping Others
              </p>
              <p
                className="
            font-inter 
            main-title-semibold 
            text-white
            m-4
            dark:text-light-900 
            max-sm:hidden"
              >
                LIVE & TRAVEL
              </p>
              <p
                className="
            font-inter 
            subtitle-semibold 
            text-white
            m-0
            dark:text-light-900 
            max-sm:hidden"
              >
                Special offers to suit your plan
              </p>

              {/* SEARCH TAB */}
              <SearchTab />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-row items-center">
          <Link href="/find-flights">
            {/* FIND FLIGHT */}
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <Image
                  src={`${
                    pathName === "/"
                      ? "/assets/icons/plane-light.svg"
                      : "/assets/icons/plane.svg"
                  }`}
                  width={20}
                  height={20}
                  alt="Find flights"
                />
                <p
                  className={`
            font-inter 
            ml-1
            body-semibold 
             ${pathName === "/" ? "text-white" : "text-dark-100"}
            
            dark:text-light-900 
            max-sm:hidden`}
                >
                  Find Flights
                </p>
              </div>

              <div
                className={`${
                  (pathName.includes("/find-flights") &&
                    "/find-flights".length > 1) ||
                  pathName === "/find-flights"
                    ? indicatorClass
                    : ""
                } `}
              ></div>
            </div>
          </Link>

          <Link href="/find-stays">
            {/* FIND STAYS */}
            <div className="flex flex-col">
              <div className="flex flex-row items-center ml-6">
                <Image
                  src={`${
                    pathName === "/"
                      ? "/assets/icons/hotel-light.svg"
                      : "/assets/icons/hotel.svg"
                  }`}
                  width={20}
                  height={20}
                  alt="Find stays"
                />
                <p
                  className={`
            font-inter 
            ml-1
            body-semibold 
            ${pathName === "/" ? "text-white" : "text-dark-100"}
            dark:text-light-900 
            max-sm:hidden`}
                >
                  Find Stays
                </p>
              </div>

              <div
                className={`${
                  (pathName.includes("/find-stays") &&
                    "/find-stays".length > 1) ||
                  pathName === "/find-stays"
                    ? indicatorClass
                    : ""
                } `}
              ></div>
            </div>
          </Link>
        </div>
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-1 absolute left-[50%] translate-x-[-50%]"
        >
          <Image
            src={`${
              pathName === "/"
                ? "/assets/icons/logo-header-light.svg"
                : "/assets/icons/logo-header-dark.svg"
            }`}
            width={60}
            height={60}
            alt="DevFlow"
          />
        </Link>
        <div className="flex-between gap-5">
          <Link href="/favourites">
            <div className="flex flex-col ">
              {/* FAVOURITES */}
              <div
                className={`
              flex flex-row items-center ml-6 border-r-[1.5px] pr-3 
              
              ${pathName === "/" ? "border-white " : "border-black "}
              border-opacity-70 h-3`}
              >
                <Image
                  src={`${
                    pathName === "/"
                      ? "/assets/icons/favourite-light.svg"
                      : "/assets/icons/favourite.svg"
                  }`}
                  width={20}
                  height={20}
                  alt="Favourite"
                />
                <p
                  className={`
            font-inter 
            ml-1
            body-semibold 
             ${pathName === "/" ? "text-white" : "text-dark-100"}
            dark:text-light-900 
            max-sm:hidden`}
                >
                  Favourites
                </p>
              </div>

              <div
                className={`${
                  (pathName.includes("/favourites") &&
                    "/favourites".length > 1) ||
                  pathName === "/favourites"
                    ? indicatorClass
                    : ""
                } `}
              ></div>
            </div>
          </Link>

          {/* AVATAR */}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9  w-9",
                },
                variables: {
                  colorPrimary: "#ff7000",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

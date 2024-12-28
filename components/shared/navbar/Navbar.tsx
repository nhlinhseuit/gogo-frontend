"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import FlightsBackground from "./background-searchtab/FlightsBackground";
import HomeBackground from "./background-searchtab/HomeBackground";
import StaysBackground from "./background-searchtab/StaysBackground";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const indicatorClass = "!border-primary-100";

  console.log(pathName === "/");

  return (
    // 60vh của background đè navbar, 144px phần dư ra của  searchtab
    <div
      className={`relative z-50 ${
        (pathName === "/" ||
          pathName === "/find-flights" ||
          pathName === "/find-stays") &&
        "pb-[calc(60vh+144px)]"
      }`}
    >
      <nav
        className={`
          flex-between
          shadow-md
          sticky z-500 w-full gap-5 px-6 h-20
          ${pathName === "/" ? "bg-transparent" : "bg-white"}
          dark:shadow-none sm:px-12
        `}
      >
        {/* HOME BACKGROUND + HOME SEARCHTAB */}
        {pathName === "/" ? (
          <HomeBackground />
        ) : pathName === "/find-flights" ? (
          <FlightsBackground />
        ) : pathName === "/find-stays" ? (
          <StaysBackground />
        ) : (
          <></>
        )}

        {/* NAVBAR */}
        <div className={"flex flex-row items-center gap-6 h-full"}>
          <div
            className={`h-full flex items-center justify-center box-border border-b-4 border-transparent ${
              pathName.includes("/find-flights") || pathName === "/find-flights"
                ? `${indicatorClass} border-b-4 border-transparent`
                : ""
            }`}
          >
            <Link href="/find-flights" className="flex items-center p-2">
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
          max-sm:hidden
        `}
                >
                  Find Flights
                </p>
              </div>
            </Link>
          </div>
          <div
            className={`h-full flex items-center justify-center box-border border-b-4 border-transparent ${
              (pathName.includes("/find-stays") && "/find-stays".length > 1) ||
              pathName === "/find-stays"
                ? indicatorClass
                : ""
            }`}
          >
            <Link href="/find-stays">
              {/* FIND STAYS */}
              <div className="flex flex-col h-full">
                <div className="flex flex-row items-center">
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
              </div>
            </Link>
          </div>
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
        <div className="flex-between gap-5 h-full">
          <Link href="/favourites">
            <div className="flex flex-col ">
              {/* FAVOURITES */}
              <div
                className={`
              flex flex-row items-center border-r-[1.5px] pr-3 
              
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

              {/* <div
                className={`${
                  (pathName.includes("/favourites") &&
                    "/favourites".length > 1) ||
                  pathName === "/favourites"
                    ? indicatorClass
                    : ""
                } `}
              ></div> */}
            </div>
          </Link>

          {/* AVATAR */}

          <div className="flex gap-2 items-center">
            <p
              onClick={() => {
                router.push(`/profile`);
              }}
              className={`
                  cursor-pointer
                  font-inter 
                  body-semibold 
                  ${pathName === "/" ? "text-white" : "text-dark-100"}
                  dark:text-light-900 
                  max-sm:hidden`}
            >
              View profile
            </p>
            <p
              onClick={() => {
                router.push(`/login`);
              }}
              className={`
                  cursor-pointer
                  font-inter 
                  body-semibold 
                  ${pathName === "/" ? "text-white" : "text-dark-100"}
                  dark:text-light-900 
                  max-sm:hidden`}
            >
              Login
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

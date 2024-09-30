"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();
  const indicatorClass = 'mt-6 bg-[#8DD3BB] h-1 absolute z-100 w-20 bottom-0 mt-6 bg-red-500 h-1 absolute z-100 w-20 bottom-0'

  return (
    <nav
      className="
    flex-between
    shadow-md
    fixed z-50 w-full gap-5 px-6 py-4 
    dark:shadow-none
    sm:px-12
     "
    >
      <div className="flex flex-row items-center">
        <Link href="/find-flights">
          {/* FIND FLIGHT */}
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <Image
                src={"/assets/icons/plane.svg"}
                width={20}
                height={20}
                alt="Find flights"
              />
              <p
                className="
          font-spaceGrotesk 
          ml-1
          body-semibold 
          text-dark-100 
          dark:text-light-900 
          max-sm:hidden"
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
                src={"/assets/icons/hotel.svg"}
                width={20}
                height={20}
                alt="Find stays"
              />
              <p
                className="
          font-spaceGrotesk 
          ml-1
          body-semibold 
          text-dark-100 
          dark:text-light-900 
          max-sm:hidden"
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
          src={"/assets/icons/logo-header.svg"}
          width={60}
          height={60}
          alt="DevFlow"
        />
      </Link>
      <div className="flex-between gap-5">
        <Link href="/favourites">
        <div className="flex flex-col">
          {/* FAVOURITES */}
          <div className="flex flex-row items-center ml-6">
            <Image
              src={"/assets/icons/favourite.svg"}
              width={20}
              height={20}
              alt="Favourite"
            />
            <p
              className="
          font-spaceGrotesk 
          ml-1
          body-semibold 
          text-dark-100 
          dark:text-light-900 
          max-sm:hidden"
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
  );
};

export default Navbar;

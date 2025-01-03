"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import FlightsBackground from "./background-searchtab/FlightsBackground";
import HomeBackground from "./background-searchtab/HomeBackground";
import StaysBackground from "./background-searchtab/StaysBackground";
import { getCurrentUser } from "@/utils/util";
import MyProfileAvatar from "../MyProfileAvatar";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setIsMounted(true);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const indicatorClass = "!border-primary-100";

  const handleLogout = () => {
    setIsDropdownOpen(false);
    toast({
      title: `Logout successfully.`,
      variant: "success",
      duration: 3000,
    });

    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
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
        {/* Background Components */}
        {isMounted && (
          pathName === "/" ? (
            <HomeBackground />
          ) : pathName === "/find-flights" ? (
            <FlightsBackground />
          ) : pathName === "/find-stays" ? (
            <StaysBackground />
          ) : null
        )}

        {/* Navigation Links */}
        <div className="flex flex-row items-center gap-6 h-full">
          {/* Find Flights Link */}
          <div
            className={`h-full flex items-center justify-center box-border border-b-4 border-transparent ${
              pathName.includes("/find-flights") || pathName === "/find-flights"
                ? indicatorClass
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

          {/* Find Stays Link */}
          <div
            className={`h-full flex items-center justify-center box-border border-b-4 border-transparent ${
              (pathName.includes("/find-stays") && "/find-stays".length > 1) ||
              pathName === "/find-stays"
                ? indicatorClass
                : ""
            }`}
          >
            <Link href="/find-stays">
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
                      max-sm:hidden
                    `}
                  >
                    Find Stays
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Logo */}
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
            alt="Logo"
          />
        </Link>

        {/* Right Section */}
        <div className="flex-between gap-5 h-full">
          {/* Favourites Link */}
          <Link href="/favourites">
            <div className="flex flex-col">
              <div
                className={`
                  flex flex-row items-center border-r-[1.5px] pr-3 
                  ${pathName === "/" ? "border-white" : "border-black"}
                  border-opacity-70 h-3
                `}
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
                    max-sm:hidden
                  `}
                >
                  Favourites
                </p>
              </div>
            </div>
          </Link>

          {/* Auth Section */}
          <div className="flex gap-2 items-center relative">
            {isMounted && (
              currentUser ? (
                <>
                  <div onClick={toggleDropdown} className="cursor-pointer">
                    <MyProfileAvatar img="/assets/images/avatar.JPG" />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white shadow-lg border rounded-lg w-48 p-2 z-50">
                      <p
                        onClick={() => {
                          router.push("/profile");
                          setIsDropdownOpen(false);
                        }}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-md"
                      >
                        View Profile
                      </p>
                      <p
                        onClick={handleLogout}
                        className="cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-100 rounded-md"
                      >
                        Logout
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p
                  onClick={() => router.push("/login")}
                  className={`
                    cursor-pointer
                    font-inter 
                    body-semibold 
                    ${pathName === "/" ? "text-white" : "text-dark-100"}
                    dark:text-light-900 
                    max-sm:hidden
                  `}
                >
                  Login
                </p>
              )
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

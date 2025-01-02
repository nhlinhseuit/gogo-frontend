"use client";

import One from "@/components/gallery/one";
import MyInput from "@/components/shared/MyInput";
import MyPasswordInput from "@/components/shared/MyPasswordInput";
import { useToast } from "@/hooks/use-toast";
import { authenticate } from "@/lib/actions/Authen/AuthenActions";
import { convertDataNavigate, convertDataReceive, validateEmail, validatePassword } from "@/utils/util";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const searchParams = useSearchParams();
  const prevRoute = searchParams.get("ref");
  const prevStaySearch = searchParams.get("location_id");
  const prevFlightSearch = searchParams.get("departure_location_id");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setisChecked] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAuthen = () => {
    if (email === "" && password === "") {
      toast({
        title: `Login failed!`,
        variant: "error",
        duration: 3000,
      });
    } else {
      authenticate({
        email: email,
        password: password,
      }).then((data) => {
        if (!data) {
          toast({
            title: `Login failed!`,
            variant: "error",
            duration: 3000,
          });
        } else {
          sessionStorage.setItem("authToken", data.token);
          sessionStorage.setItem("currentUser", JSON.stringify(data.user));

          if (prevRoute) router.push(`/${prevRoute}`);
          else if (!prevRoute && prevStaySearch) {
            router.push(`/find-stays/stays-search?${searchParams}`);
          } else if (!prevRoute && prevFlightSearch) {

              const paramsData = convertDataReceive(searchParams);
              const queryString = new URLSearchParams(convertDataNavigate(paramsData)).toString();
            
            router.push(`/find-flights/flights-search?${queryString}`);

          } else {
            toast({
              title: `Login successfully!`,
              variant: "success",
              duration: 3000,
            });
            router.push(`/`);
          }
        }
      });
    }
  };


  return (
    <main>
      <div className="w-full h-screen flex gap-12">
        <div className="flex-grow flex flex-col items-start justify-center gap-6">
          <Image
            src="/assets/icons/logo-header-dark.svg"
            width={80}
            height={80}
            alt="DevFlow"
            className="mb-6"
          />
          <div>
            <p className="text-[34px] font-semibold leading-[40px]">Login</p>
            <p className="mt-4 ml-2 text-[16px] text-[#112211] font-medium leading-[24px]">
              Login to access your Gogo account
            </p>
          </div>

          <div className="w-full flex flex-col gap-6">
            <MyInput
              type="text"
              label="Email"
              placeholder="dev.hoanglinh@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              validate={validateEmail}
            />

            <MyPasswordInput
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              validate={validatePassword}
            />

            <div className="flex gap-44 justify-between items-center w-full">
              <div className="flex gap-4">
                <input
                  id="Rememberme"
                  name="Rememberme"
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setisChecked(!isChecked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="Rememberme"
                  className="cursor-pointer body-regular -translate-y-[1px] text-dark200_light900 line-clamp-2 flex-1 m-0"
                >
                  Remember me
                </label>
              </div>

              <p
                onClick={() => {
                  router.push(`/forgot-password`);
                }}
                className="text-[14px] font-medium leading-[20px] text-[#FF8682] cursor-pointer"
              >
                Forgot Password
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <button
              onClick={handleAuthen}
              className="w-full flex justify-center items-center rounded-md gap-x-1 px-4 py-3 bg-primary-100 "
            >
              <p className="body-semibold text-black">Login</p>
            </button>

            <p className="w-full text-center text-[14px] font-medium leading-[20px]">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  router.push(`/sign-up`);
                }}
                className="cursor-pointer text-[#FF8682] font-semibold"
              >
                Sign up
              </span>
            </p>
          </div>

          {/* <div className="w-full flex items-center">
            <div className="flex-grow bg-gray-300 h-[1px]"></div>

            <p className="mx-4 bg-white px-2 text-[14px] text-gray-500 font-medium leading-[24px]">
              Or login with
            </p>

            <div className="flex-grow bg-gray-300 h-[1px]"></div>
          </div>

          <div className="w-full flex gap-4">
            <SocialIcon icon={"/assets/icons/facebook-color.svg"} />
            <SocialIcon icon={"/assets/icons/google-color.svg"} />
            <SocialIcon icon={"/assets/icons/apple-color.svg"} />
          </div> */}
        </div>

        {/* //TODO: RIGHT */}

        <div className="flex flex-grow items-center justify-center">
          <One />
        </div>
      </div>
    </main>
  );
};

export default Login;

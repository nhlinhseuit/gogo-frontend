"use client";

import One from "@/components/gallery/one";
import BackToPrev from "@/components/shared/BackToPrev";
import MyInput from "@/components/shared/MyInput";
import SocialIcon from "@/components/shared/SocialIcon";
import { toast } from "@/hooks/use-toast";
import { forgotPassword } from "@/lib/actions/Authen/ForgotPassword";
import { validateEmail } from "@/utils/util";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const isValidForm = () => {
    return email.trim() !== "";
  };

  const handleSubmit = async () => {
    if (!isValidForm()) {
      toast({
        title: `Please enter your email!`,
        variant: "error",
        duration: 3000,
      });
      return;
    } else if (validateEmail(email)) {
      toast({
        title: `Invalid email format!`,
        variant: "error",
        duration: 3000,
      });
      return;
    } else {
      const res = await forgotPassword({ email: email });
      if (!res) return;

      const otp_id = res.otp_id;
      router.push(`/verify-code?otp_id=${otp_id}&email=${email}`);
    }
  };

  return (
    <main>
      <div className="w-full h-screen flex gap-12">
        <div className="ml-4 flex-grow flex flex-col items-start justify-center gap-10">
          <Image
            src="/assets/icons/logo-header-dark.svg"
            width={80}
            height={80}
            alt="DevFlow"
          />
          <div>
            <BackToPrev text={"Back to login"} linkPrev="/login" />
            <p className="text-[34px] font-semibold leading-[40px]">
              Forgot your password?
            </p>
            <p className="mt-4 ml-2 text-[16px] text-[#112211] font-medium leading-[24px]">
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </p>
          </div>

          <div className="w-full">
            <MyInput
              type="text"
              label="Email"
              placeholder="dev.hoanglinh@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              validate={validateEmail}
            />
          </div>

          <div className="w-full flex flex-col gap-6">
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center items-center rounded-md gap-x-1 px-4 py-3 bg-primary-100 "
            >
              <p className="body-semibold text-black">Submit</p>
            </button>
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

export default page;

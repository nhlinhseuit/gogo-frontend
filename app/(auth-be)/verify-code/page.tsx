"use client";

import One from "@/components/gallery/one";
import BackToPrev from "@/components/shared/BackToPrev";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import MyInput from "@/components/shared/MyInput";
import SocialIcon from "@/components/shared/SocialIcon";
import { toast } from "@/hooks/use-toast";
import { forgotPassword } from "@/lib/actions/Authen/ForgotPassword";
import { verifyCode } from "@/lib/actions/Authen/VerifyCode";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const Page = () => {
  const [code, setCode] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otpId, setOtpId] = useState(searchParams.get("otp_id"));

  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    setIsLoading(true);

    const res = await forgotPassword({ email: email });

    if (!res) return;
    const newOtpId = res.otp_id;
    router.replace(`/verify-code?otp_id=${newOtpId}&email=${email}`);

    setOtpId(newOtpId);
    setIsLoading(false);
  };

  const isValidForm = () => {
    return code.trim() !== "";
  };

  const handleSubmit = async () => {
    if (!isValidForm()) {
      toast({
        title: `Please enter code!`,
        variant: "error",
        duration: 3000,
      });
      return;
    }

    const res = await verifyCode({
      email: email,
      otp_id: otpId,
      code: "abcxyz",
    });

    router.push(`/set-password?otp_id=${otpId}&email=${email}`);
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
              Verify code
            </p>
            <p className="mt-4 ml-2 text-[16px] text-[#112211] font-medium leading-[24px]">
              An authentication code has been sent to your email.
            </p>
          </div>

          <div className="w-full">
            <MyInput
              type="text"
              label="Enter code"
              placeholder="7789BM6X"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className="flex gap-2 items-center">
              <p className="mt-6 body-regular -translate-y-[1px] text-dark200_light900 line-clamp-2 m-0">
                Didn't receive the code?{" "}
                <span
                  onClick={handleResend}
                  className="text-[#FF8682] cursor-pointer "
                >
                  Resend
                </span>
              </p>
              {isLoading && <LoadingSpinner />}
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center items-center rounded-md gap-x-1 px-4 py-3 bg-primary-100 "
            >
              <p className="body-semibold text-black">Verify</p>
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

const SuspendedPage = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <Page />
  </Suspense>
);

export default SuspendedPage;

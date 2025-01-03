"use client";

import One from "@/components/gallery/one";
import BackToPrev from "@/components/shared/BackToPrev";
import MyPasswordInput from "@/components/shared/MyPasswordInput";
import { toast } from "@/hooks/use-toast";
import { updatePassword } from "@/lib/actions/Authen/UpdatePassword";
import {
  validateConfirmPassword,
  validatePassword
} from "@/utils/util";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const Page = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otpId, setOtpId] = useState(searchParams.get("otp_id"));

  const isValidForm = () => {
    return (
      password.trim() !== "" &&
      passwordConfirm.trim() !== "" &&
      password === passwordConfirm &&
      password.length > 5 &&
      passwordConfirm.length > 5
    );
  };

  const handleSubmit = () => {
    if (!isValidForm()) {
      toast({
        title: `Please enter valid information!`,
        variant: "error",
        duration: 3000,
      });
      return;
    } else {
      updatePassword({
        email: email,
        otp_id: otpId,
        new_password: password,
      });
      toast({
        title: `Set password successfully!`,
        variant: "success",
        duration: 3000,
      });
      router.push(`/login`);
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
              Set a password
            </p>
            <p className="mt-4 ml-2 text-[16px] text-[#112211] font-medium leading-[24px]">
              Your previous password has been reseted. Please set a new password
              for your account.
            </p>
          </div>

          <div className="w-full">
            <MyPasswordInput
              label="Create Password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              validate={validatePassword}
            />
          </div>

          <div className="w-full">
            <MyPasswordInput
              label="Re-enter Password"
              placeholder="Re-enter Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              validate={(value) => validateConfirmPassword(password, value)}
            />
          </div>

          <div className=" w-full flex flex-col gap-6">
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center items-center rounded-md gap-x-1 px-4 py-3 bg-primary-100 "
            >
              <p className="body-semibold text-black">Set password</p>
            </button>
          </div>

          <div className="h-20 w-full flex flex-col gap-6"></div>
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

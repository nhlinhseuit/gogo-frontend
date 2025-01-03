"use client";

import One from "@/components/gallery/one";
import MyInput from "@/components/shared/MyInput";
import MyPasswordInput from "@/components/shared/MyPasswordInput";
import { toast } from "@/hooks/use-toast";
import { registerAccount } from "@/lib/actions/Authen/RegisterActions";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "@/utils/util";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const [isNameEmpty, setIsNameEmpty] = useState(false);

  const isValidForm = () => {
    return (
      email != "" &&
      phone != "" &&
      password != "" &&
      passwordConfirm != "" &&
      isChecked
    );
  };

  const handleRegister = () => {
    if (!isValidForm()) {
      toast({
        title: `Please enter valid information!`,
        variant: "error",
        duration: 3000,
      });
      return;
    }

    if (firstName.trim() === "" && lastName.trim() === "") {
      setIsNameEmpty(true);
      toast({
        title: `First name and last name cannot both be empty!`,
        variant: "error",
        duration: 3000,
      });
      return;
    }

    registerAccount({
      email: email,
      password: password,
      phone: phone,
      first_name: firstName,
      last_name: lastName,
    }).then((data) => {
      if (!data) {
        toast({
          title: `Register failed!`,
          variant: "error",
          duration: 3000,
        });
      } else {
        toast({
          title: `Register successfully!`,
          variant: "success",
          duration: 3000,
        });
        router.push(`/login`);
      }
    });
  };

  return (
    <main>
      <div className="w-full h-screen flex gap-12">
        <div className="ml-4 flex-grow flex flex-col items-start justify-center gap-6">
          <Image
            src="/assets/icons/logo-header-dark.svg"
            width={80}
            height={80}
            alt="DevFlow"
            className="mb-6"
          />
          <div>
            <p className="text-[34px] font-semibold leading-[40px]">Sign up</p>
            <p className="mt-4 ml-2 text-[16px] text-[#112211] font-medium leading-[24px]">
              Let’s get you all st up so you can access your personal account.
            </p>
          </div>

          <div className="w-full flex flex-col gap-6">
            <div className="flex gap-4">
              <MyInput
                type="text"
                label="First Name"
                placeholder="Nguyen"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                isNameEmpty={isNameEmpty}
              />

              <MyInput
                type="text"
                label="Last Name"
                placeholder="Linh"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                isNameEmpty={isNameEmpty}
                
              />
            </div>

            <div className="flex gap-4">
              <MyInput
                type="text"
                label="Email"
                placeholder="dev.hoanglinh@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                validate={validateEmail}
              />

              <MyInput
                type="text"
                label="Phone number"
                placeholder="+8478060972"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                validate={validatePhoneNumber}
              />
            </div>

            <MyPasswordInput
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              validate={validatePassword}
            />

            <MyPasswordInput
              label="Confirm password"
              placeholder="Enter confirm password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              validate={(value) => validateConfirmPassword(password, value)}
            />

            <div className="flex gap-44 justify-between items-center w-full">
              <div className="flex gap-4">
                <input
                  id="Rememberme"
                  name="Rememberme"
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="Rememberme"
                  className="body-regular -translate-y-[1px] text-dark200_light900 line-clamp-2 flex-1 m-0"
                >
                  I agree to all the{" "}
                  <span className="text-[#FF8682] cursor-pointer ">Terms</span>{" "}
                  and{" "}
                  <span className="text-[#FF8682] cursor-pointer ">
                    Privacy Policies
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <button
              onClick={handleRegister}
              className={`w-full flex justify-center items-center rounded-md gap-x-1 px-4 py-3 bg-primary-100`}
            >
              <p className="body-semibold text-black">Create account</p>
            </button>

            <p className="w-full text-center text-[14px] font-medium leading-[20px]">
              Already have an account?{" "}
              <span
                onClick={() => {
                  router.push(`/login`);
                }}
                className="cursor-pointer text-[#FF8682] font-semibold"
              >
                Login
              </span>
            </p>
          </div>

          {/* <div className="w-full flex items-center">
            <div className="flex-grow bg-gray-300 h-[1px]"></div>

            <p className="mx-4 bg-white px-2 text-[14px] text-gray-500 font-medium leading-[24px]">
              Or Sign up with
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

export default Signup;

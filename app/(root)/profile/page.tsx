"use client";

import MyAvatar from "@/components/shared/MyAvatar";
import AccountInfoSection from "@/components/shared/Profile/AccountInfoSection";
import AccountTab from "@/components/shared/Profile/AccountTab";
import HistoryInfoSection from "@/components/shared/Profile/HistoryInfoSection";
import PaymentInfoSection from "@/components/shared/Profile/PaymentInfoSection";
import { editUserCoverPicture } from "@/lib/actions/Search/EditUserCoverPicture";
import { getUserInfo } from "@/lib/actions/Search/GetUserInfo";
import UserInfo from "@/types/UserInfo";
import { getCurrentUser } from "@/utils/util";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../globals.css";

export default function Profile() {
  //? Middleware
  const router = useRouter();
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.replace(`/login?ref=profile`)
    };
  }, []);

  const [isSelected, setIsSelected] = useState("Tickets/Bookings");
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tempCoverImage, setTempCoverImage] = useState<File | null>(null);
  const [isEditingCover, setIsEditingCover] = useState(false);

  //! xem lại sd tempcoverimg
  //! sửa lại hiển thị image từ API, hiển thị được hình, sửa cho avatar


  useEffect(() => {
    getUserInfo("3")
      .then((data: any) => {
        setUserInfo(data.data);
        // setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        // setIsLoading(false);
      });
  }, []);

  const [coverImage, setCoverImage] = useState(
    userInfo?.cover_url
      ? userInfo.cover_url
      : "/assets/images/background_avatar.svg"
  );

  // const handleSaveCoverPictureAPI = async () => {
  //   if (!tempCoverImage) {
  //     alert("No new cover image to save.");
  //     return;
  //   }

  //   try {
  //     await editUserCoverPicture("1", tempCoverImage);
  //     alert("Avatar updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating cover picture:", error);
  //     alert("Failed to update cover.");
  //     setCoverImage("/assets/images/background_avatar.svg");
  //   }
  // };

  const handleSaveCoverPictureAPI = async () => {
    const userId = "3";

    if (!tempCoverImage) {
      alert("No new cover image to save.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", tempCoverImage); // Thêm file ảnh vào form data

      console.log("File in FormData:", formData.get("file"));



      await editUserCoverPicture(userId, formData); // Gửi form data qua API
      alert("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating cover picture:", error);
      alert("Failed to update cover.");
      setCoverImage("/assets/images/background_avatar.svg");
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (typeof reader.result === "string") {
  //         setTempCoverImage(reader.result);
  //       }
  //       setIsEditingCover(true);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     alert("Please select a valid image file.");
  //   }
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setTempCoverImage(file); // Lưu trực tiếp file vào state
      setIsEditingCover(true);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const saveCoverImage = () => {
    if (tempCoverImage) {
      //!HERE
      // setCoverImage(tempCoverImage);
      setTempCoverImage(null);
      setIsEditingCover(false);
    }

    handleSaveCoverPictureAPI();
  };

  const renderComponent = () => {
    if (isSelected === "Account")
      return <AccountInfoSection userInfo={userInfo} />;
    else if (isSelected === "Tickets/Bookings") return <HistoryInfoSection />;
    else return <PaymentInfoSection />;
  };

  const tabs = [
    // {
    //   type: "Account",
    //   title: "Account",
    // },
    {
      type: "Tickets/Bookings",
      title: "Tickets/Bookings",
    },
    {
      type: "Payment methods",
      title: "Payment methods",
    },
  ];

  return (
    <main className="mb-16">
      <div className="mt-16">
        <div className="w-full relative">
          <div className="relative">
            <div
              style={{
                width: "220px",
                height: "300px",
              }}
            >
              {/* //!HERE */}
              {/* <Image
                src={tempCoverImage || coverImage}
                alt="Cover"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                onError={() =>
                  setCoverImage("/assets/images/background_avatar.svg")
                }
              /> */}
            </div>

            <div className="cursor-pointer flex gap-2 items-center absolute right-6 bottom-6  rounded-md">
              <input
                type="file"
                accept="image/*"
                id="cover-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              {!isEditingCover ? (
                <label
                  htmlFor="cover-upload"
                  className="bg-primary-100 py-2 px-3 rounded-md cursor-pointer flex items-center gap-2"
                >
                  <Image
                    src={`/assets/icons/upload.svg`}
                    width={16}
                    height={16}
                    alt="Upload"
                  />
                  <p className="body-medium">Upload new cover</p>
                </label>
              ) : (
                <div className="flex gap-2">
                  <div
                    className="bg-primary-100 py-2 px-3 rounded-md flex items-center gap-2 cursor-pointer"
                    onClick={saveCoverImage}
                  >
                    <Image
                      src={`/assets/icons/save.svg`}
                      width={16}
                      height={16}
                      alt="Save"
                    />
                    <p className="body-medium">Save new cover</p>
                  </div>

                  <div
                    className="flex items-center gap-2 cursor-pointer bg-gray-300 text-white py-2 px-3 rounded-md"
                    onClick={() => {
                      setTempCoverImage(null); // Xóa ảnh tạm thời
                      setIsEditingCover(false); // Thoát trạng thái chỉnh sửa
                    }}
                  >
                    <Image
                      src={`/assets/icons/close.svg`} // Đặt icon phù hợp
                      width={16}
                      height={16}
                      alt="Cancel"
                    />
                    <p className="body-medium">Cancel</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="absolute -translate-y-[35%] left-[50%] transform -translate-x-[50%]">
            <MyAvatar img={userInfo?.avatar_url} />
            <div className="mt-4 flex flex-col gap-2 text-center justify-center items-center ">
              <p className="paragraph-semibold">{userInfo?.full_name}</p>
              <p className="body-medium text-[#112211]">{userInfo?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[230px] flex justify-evenly h-18 bg-white rounded-lg shadow-full shadow-primary-400">
        <div className="w-full flex">
          <div className="w-1/2">
            <AccountTab
              key={1}
              title={tabs[0].title}
              isSelected={isSelected}
              onClick={() => {
                setIsSelected(tabs[0].title);
              }}
            />
          </div>
          <div className="w-[1px] my-4 bg-gray-300"></div>
          <div className="w-1/2">
            <AccountTab
              title={tabs[1].title}
              isSelected={isSelected}
              onClick={() => {
                setIsSelected(tabs[1].title);
              }}
            />
          </div>
        </div>

        {/* {tabs.map((item, index) => {
          return item.type === "Tickets/Bookings" ? (
            <AccountTab
              key={index}
              title={item.title}
              isSelected={isSelected}
              onClick={() => {
                setIsSelected(item.title);
              }}
            />
          ) : (
            <div key={index} className="flex">
              <div className="w-[1px] my-4 bg-gray-300"></div>
              <AccountTab
                title={item.title}
                isSelected={isSelected}
                onClick={() => {
                  setIsSelected(item.title);
                }}
              />
            </div>
          );
        })} */}
      </div>

      {renderComponent()}
    </main>
  );
}

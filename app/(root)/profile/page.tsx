"use client";

import MyAvatar from "@/components/shared/MyAvatar";
import AccountInfoSection from "@/components/shared/Profile/AccountInfoSection";
import AccountTab from "@/components/shared/Profile/AccountTab";
import HistoryInfoSection from "@/components/shared/Profile/HistoryInfoSection";
import PaymentInfoSection from "@/components/shared/Profile/PaymentInfoSection";
import { editUserCoverPicture } from "@/lib/actions/Profile/EditUserCoverPicture";
import { getUserInfo } from "@/lib/actions/Profile/GetUserInfo";
import UserInfo from "@/types/UserInfo";
import { getCurrentUser } from "@/utils/util";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../globals.css";
import NoResult from "@/components/shared/NoResult";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Profile() {
  const tabs = [
    {
      type: "Account",
      title: "Account",
    },
    {
      type: "Tickets/Bookings",
      title: "Tickets/Bookings",
    },
    {
      type: "Payment methods",
      title: "Payment methods",
    },
  ];

  const [isSelected, setIsSelected] = useState("Account");
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [tempCoverImage, setTempCoverImage] = useState<File | null>(null);
  const [tempCoverImageURL, setTempCoverImageURL] = useState<string | null>(
    null
  );

  const [isEditingCover, setIsEditingCover] = useState(false);

  //? Middleware
  const currentUser = getCurrentUser();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!currentUser) {
      setIsAuthenticated(false);

      setTimeout(() => {
        router.push(`/login?ref=profile`);
      }, 2300);
    } else {
      setIsAuthenticated(true);

      getUserInfo()
        .then((data: any) => {
          setUserInfo(data.data);
          // setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          // setIsLoading(false);
        });
    }
  }, []);

  const [coverImage, setCoverImage] = useState("/assets/images/bg.png");

  useEffect(() => {
    if (userInfo?.cover_url) {
      setCoverImage(userInfo.cover_url);
    }
  }, [userInfo]);

  const handleSaveCoverPictureAPI = async () => {
    if (!tempCoverImage) {
      alert("No new cover image to save.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", tempCoverImage); // Thêm file ảnh vào form data

      setIsLoading(true);
      editUserCoverPicture(formData).then((data) => {
        setIsLoading(false);
        alert("Cover image successfully!");
        setCoverImage((data.data as UserInfo).cover_url);
      });
    } catch (error) {
      console.error("Error updating cover picture:", error);
      alert("Failed to update cover.");
      setCoverImage("/assets/images/bg.png");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const blobURL = URL.createObjectURL(file); // Tạo URL tạm thời từ File
      setTempCoverImage(file); // Lưu file để gửi API
      setTempCoverImageURL(blobURL); // Lưu URL để hiển thị ảnh
      setIsEditingCover(true);
    } else {
      alert("Please select a valid image file.");
    }
  };

  useEffect(() => {
    return () => {
      if (tempCoverImageURL) {
        URL.revokeObjectURL(tempCoverImageURL);
      }
    };
  }, [tempCoverImageURL]);

  const saveCoverImage = () => {
    if (tempCoverImage && tempCoverImageURL) {
      // Cập nhật hình ảnh hiển thị từ blob URL
      setCoverImage(tempCoverImageURL);

      // Reset trạng thái chỉnh sửa
      setTempCoverImage(null);
      setTempCoverImageURL(null);
      setIsEditingCover(false);

      // Gửi API để lưu ảnh
      handleSaveCoverPictureAPI();
    } else {
      alert("No new cover image to save.");
    }
  };

  const renderComponent = () => {
    if (isSelected === "Account")
      return <AccountInfoSection userInfo={userInfo} />;
    else if (isSelected === "Tickets/Bookings") return <HistoryInfoSection />;
    else return <PaymentInfoSection />;
  };

  if (isAuthenticated === null) {
    return (
      <NoResult
        title="Checking..."
        description="We are checking your informations..."
      />
    );
  }

  if (isAuthenticated === false) {
    return (
      <NoResult
        title="Wait a sec..."
        description="You will be redirected to login page in just a few seconds..."
      />
    );
  }

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
              <Image
                src={tempCoverImageURL || coverImage} // URL tạm thời hoặc ảnh từ API
                alt="Cover"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                onError={() =>
                  setCoverImage("/assets/images/background_avatar.svg")
                }
              />
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
                  {isLoading ? (
                    <div className="mb-4 mr-1">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <Image
                      src={`/assets/icons/upload.svg`}
                      width={16}
                      height={16}
                      alt="Upload"
                    />
                  )}

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
                      setTempCoverImageURL(null); // Xóa ảnh tạm thời
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
        {tabs.map((item, index) => {
          return item.type === "Account" ? (
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
        })}
      </div>

      {renderComponent()}
    </main>
  );
}

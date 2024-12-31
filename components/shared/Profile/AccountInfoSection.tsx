import AccountChangeButton from "@/components/shared/Profile/AccountChangeButton";
import AddEmailButton from "@/components/shared/Profile/AddEmailButton";
import UserInfo from "@/types/UserInfo";
import EditableField from "../EditableField";
import { useState, useEffect } from "react";

const AccountInfoSection = ({
  userInfo,
}: {
  userInfo: UserInfo | undefined;
}) => {
  const [currentUserInfo, setCurrentUserInfo] = useState<UserInfo | undefined>(
    userInfo
  );

  const handleFieldSave = async (field: keyof UserInfo, newValue: string) => {
    if (currentUserInfo) {
      const updatedUserInfo = { ...currentUserInfo, [field]: newValue };
      setCurrentUserInfo(updatedUserInfo);

      // Gọi API PATCH
      try {
        await fetch("/api/update-user-info", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [field]: newValue }),
        });
      } catch (error) {
        console.error("Error updating user info:", error);
        alert("Failed to update user info.");
      }
    }
  };

  useEffect(() => {
    setCurrentUserInfo(userInfo); // Cập nhật lại giá trị của currentUserInfo khi userInfo thay đổi
  }, [userInfo]);

  return (
    <>
      <p className="ml-2 mt-10 text-[24px] font-semibold leading-[20.8px]">
        Account
      </p>

      <div className="mt-4 mb-[150px] flex flex-col gap-8 p-6 bg-white rounded-lg shadow-full ">
        <EditableField
          label="Name"
          value={currentUserInfo?.full_name}
          onSave={(newValue) => handleFieldSave("full_name", newValue)}
        />

        <EditableField
          label="Email"
          value={currentUserInfo?.email}
          onSave={(newValue) => handleFieldSave("email", newValue)}
        />

        <EditableField
          label="Phone number"
          value={currentUserInfo?.phone_number}
          onSave={(newValue) => handleFieldSave("phone_number", newValue)}
        />

        <EditableField
          label="Address"
          value={currentUserInfo?.address}
          onSave={(newValue) => handleFieldSave("address", newValue)}
        />

        <EditableField
          label="Date of birth"
          value={currentUserInfo?.date_of_birth}
          onSave={(newValue) => handleFieldSave("date_of_birth", newValue)}
        />
      </div>
    </>
  );
};

export default AccountInfoSection;

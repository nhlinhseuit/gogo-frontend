import { editUserAvatar } from "@/lib/actions/Profile/EditUserAvatar";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const MyAvatar = ({ img }: { img: string | undefined }) => {
  const [avatarSrc, setAvatarSrc] = useState("/assets/images/avt.png");
  const [tempAvatarFile, setTempAvatarFile] = useState<File | null>(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  // Cập nhật avatarSrc khi `img` thay đổi
  useEffect(() => {
    if (img) {
      setAvatarSrc(img);
    }
  }, [img]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setTempAvatarFile(file);
      setIsEditingAvatar(true);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatarSrc(reader.result); // Hiển thị ảnh tạm thời
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSaveAvatarPictureAPI = async () => {
    setIsEditingAvatar(false);

    if (!tempAvatarFile) {
      alert("No new avatar image to save.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", tempAvatarFile);

      await editUserAvatar(formData); // Gửi form data chứa file avatar
      setTempAvatarFile(null);
      alert("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar picture:", error);
      alert("Failed to update avatar.");
      setAvatarSrc("/assets/images/avt.png");
    }
  };

  const handleEditClick = () => {
    if (isEditingAvatar) {
      handleSaveAvatarPictureAPI();
    } else {
      const fileInput = document.getElementById(
        "avatarInput"
      ) as HTMLInputElement;
      fileInput?.click();
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Avatar Container */}
      <div
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          width: "220px",
          height: "220px",
          position: "relative",
          border: "5px solid #8dd3bb",
        }}
      >
        <Image
          src={avatarSrc}
          alt="avatar"
          layout="fill"
          objectFit="cover"
          onError={() => setAvatarSrc("/assets/images/avt.png")}
        />
      </div>

      {/* Edit/Save Icon */}
      <div
        className="cursor-pointer absolute bottom-4 right-4 w-10 h-10 bg-[#8dd3bb] border-white border-[3px] rounded-full flex items-center justify-center shadow-lg"
        style={{
          transform: "translate(0%, 0%)",
          zIndex: 10,
        }}
        onClick={handleEditClick}
      >
        <Image
          src={
            isEditingAvatar
              ? `/assets/icons/save.svg`
              : `/assets/icons/edit-profile.svg`
          }
          width={16}
          height={16}
          alt={isEditingAvatar ? "Save" : "Edit"}
        />
      </div>

      {/* Hidden File Input */}
      <input
        id="avatarInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default MyAvatar;

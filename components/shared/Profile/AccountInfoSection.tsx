import AccountChangeButton from "@/components/shared/Profile/AccountChangeButton";
import AddEmailButton from "@/components/shared/Profile/AddEmailButton";
import UserInfo from "@/types/UserInfo";

const AccountInfoSection = ({
  userInfo,
}: {
  userInfo: UserInfo | undefined;
}) => {
  return (
    <>
      <p className="ml-2 mt-10 text-[24px] font-semibold leading-[20.8px]">
        Account
      </p>

      <div
        className={`mt-4 mb-[150px] flex flex-col gap-8 p-6 bg-white rounded-lg shadow-full `}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="title-medium text-[#112211]">Name</p>
            <p className="paragraph-semibold">{userInfo?.full_name}</p>
          </div>

          <AccountChangeButton />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="title-medium text-[#112211]">Email</p>
            <p className="paragraph-semibold">{userInfo?.email}</p>
          </div>

          <div className="flex gap-2">
            <AddEmailButton />
            <AccountChangeButton />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="title-medium text-[#112211]">Phone number</p>
            <p className="paragraph-semibold">{userInfo?.phone_number}</p>
          </div>

          <AccountChangeButton />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="title-medium text-[#112211]">Address</p>
            <p className="paragraph-semibold">{userInfo?.address}</p>
          </div>

          <AccountChangeButton />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="title-medium text-[#112211]">Date of birth</p>
            <p className="paragraph-semibold">{userInfo?.date_of_birth}</p>
          </div>

          <AccountChangeButton />
        </div>
      </div>
    </>
  );
};

export default AccountInfoSection;

import AccountChangeButton from "@/components/shared/Profile/AccountChangeButton";
import AddEmailButton from "@/components/shared/Profile/AddEmailButton";

const AccountInfoSection = () => {
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
            <p className="text-[13px] font-medium leading-[18.2px] text-[#112211]">Name</p>
            <p className="paragraph-semibold">John Doe.</p>
          </div>

          <AccountChangeButton />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium leading-[18.2px] text-[#112211]">Email</p>
            <p className="paragraph-semibold">john.doe@gmail.com</p>
          </div>

          <div className="flex gap-2">
            <AddEmailButton />
            <AccountChangeButton />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium leading-[18.2px] text-[#112211]">Password</p>
            <p className="paragraph-semibold">************</p>
          </div>

          <AccountChangeButton />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium leading-[18.2px] text-[#112211]">Phone number</p>
            <p className="paragraph-semibold">0378060972</p>
          </div>

          <AccountChangeButton />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium leading-[18.2px] text-[#112211]">Address</p>
            <p className="paragraph-semibold">
              St 32 main downtown, Los Angeles, California, USA
            </p>
          </div>

          <AccountChangeButton />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium leading-[18.2px] text-[#112211]">Date of birth</p>
            <p className="paragraph-semibold">26/09/2003</p>
          </div>

          <AccountChangeButton />
        </div>
      </div>
    </>
  );
};

export default AccountInfoSection;

import AccountChangeButton from "@/components/shared/Profile/AccountChangeButton";
import AddEmailButton from "@/components/shared/Profile/AddEmailButton";
import PaymentCard from "./PaymentCard";

const PaymentInfoSection = () => {
  return (
    <>
      <p className="ml-2 mt-10 text-[24px] font-semibold leading-[20.8px]">
        Payment Methods
      </p>

      <div
        className={`mt-4 mb-[150px] flex flex-col gap-8 p-6 bg-white rounded-lg shadow-full `}
      >
        <PaymentCard />
      </div>
    </>
  );
};

export default PaymentInfoSection;

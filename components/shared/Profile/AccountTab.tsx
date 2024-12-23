import Image from "next/image";

const AccountTab = ({
  title,
  onClick,
  isSelected,
  icon,
}: {
  title: string;
  onClick: () => void;
  isSelected: string;
  icon?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={`py-4 pl-4 mx-4 pr-36 cursor-pointer ${
        isSelected === title ? "border-b-4 border-primary-100" : ""
      }`}
    >
      <div className="flex gap-2 items-center">
        {icon ? (
          <Image src={icon} width={20} height={20} alt="Find flights" />
        ) : null}

        <h6 className="font-semibold">{title}</h6>
      </div>
    </div>
  );
};

export default AccountTab;

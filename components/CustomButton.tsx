import Image from "next/image";

interface CustomButtonType {
  srcUrl: string;
  text: string;
  onClick?: () => void;
}

const CustomButton = ({ srcUrl, text, onClick }: CustomButtonType) => {
  return (
    <div
      className="flex-between h-10 bg-primary-100 px-4 rounded-[4px] cursor-pointer"
      onClick={onClick && onClick}
    >
      <Image src={srcUrl} width={20} height={20} alt="show-flights" />
      <p
        className={`
          ml-1
          font-inter 
          body-medium 
          text-dark-100
          dark:text-light-900 
          max-sm:hidden`}
      >
        {text}
      </p>
    </div>
  );
};

export default CustomButton;

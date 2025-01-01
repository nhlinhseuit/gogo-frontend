import Image from "next/image";

const SocialIcon = ({ icon }: { icon: string }) => {
  return (
    <div className="cursor-pointer flex-grow flex border-[2px] border-[#8DD3BB] px-4 py-2 rounded-md justify-center items-center">
      <Image src={icon} width={24} height={24} alt="Find flights" />
    </div>
  );
};

export default SocialIcon;

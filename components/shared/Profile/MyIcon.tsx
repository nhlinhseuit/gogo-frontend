import Image from "next/image";

interface Props {
  title: string;
  desc: string;
  icon: string;
}

const MyIcon = (params: Props) => {
  return (
    <div className="flex gap-2">
      <div className="flex px-2 bg-[#ebf6f2] rounded-md justify-center items-center">
        <Image src={params.icon} width={24} height={24} alt="Find flights" />
      </div>
      <div>
        <div className="small-semibold text-[#112211]">{params.title}</div>
        <div className="mt-1 body-medium">{params.desc}</div>
      </div>
    </div>
  );
};

export default MyIcon;
